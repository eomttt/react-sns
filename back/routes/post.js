const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const PostModel = require('../models/post');
const HashTagModel = require('../models/hashTag');
const CommentModel = require('../models/comment');

const router = express.Router();
const { ObjectId } = mongoose.Types;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // example.png, ext === .png, basename === example
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', async (req, res, next) => { // POST /api/post/
  try {
    const hashTags = req.body.text.match(/#[^\s]+/g);
    const newPost = await PostModel.create({
      content: req.body.text,
      userId: req.user.userId,
      images: req.body.images,
    });

    if (hashTags) {
      await Promise.all(hashTags.map(async (hashTag) => {
        await HashTagModel.findOneAndUpdate({
          content: hashTag,
        }, {
          $addToSet: {
            posts: newPost.id,
          },
        }, {
          upsert: true,
          multie: true,
        });
      }));
    }

    const fullPost = await PostModel.aggregate([{
      $match: {
        _id: newPost._id,
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId', // Standard key from now db(Post)
        foreignField: 'userId', // Find key by from db(Users)
        as: 'userData',
      },
    }, {
      $project: {
        content: '$content',
        images: '$images',
        likers: '$likers',
        user: {
          nickname: '$userData.nickname',
          userId: '$userData.userId',
        },
      },
    }]);

    console.log(fullPost[0]);

    res.json(fullPost[0]);
  } catch (error) {
    console.error('Add post error. ', error);
    next(error);
  }
});

router.post('/:id/comment', async (req, res, next) => { // POST /api/post/:id/comment
  try {
    const { userId, content } = req.body;
    const { id } = req.params;

    await CommentModel.create({
      userId,
      postId: id,
      content,
    });

    const comments = await CommentModel.aggregate([{
      $match: {
        postId: id,
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId', // Standard key from now db(Comments)
        foreignField: 'userId', // Find key by from db(Users)
        as: 'userData',
      },
    }, {
      $project: {
        content: '$content',
        postId: '$postId',
        user: {
          nickname: '$userData.nickname',
          userId: '$userData.userId',
        },
      },
    }]);

    console.log(comments[comments.length - 1]);
    return res.json(comments[comments.length - 1]);
  } catch (error) {
    console.error('Add post comment error. ', error);
    return next(error);
  }
});

router.get('/:id/comments', async (req, res, next) => { // GET /api/post/:id/comments
  try {
    const { id } = req.params;

    const comments = await CommentModel.aggregate([{
      $match: {
        postId: id,
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId', // Standard key from now db(Comments)
        foreignField: 'userId', // Find key by from db(Users)
        as: 'userData',
      },
    }, {
      $project: {
        content: '$content',
        postId: '$postId',
        user: {
          nickname: '$userData.nickname',
          userId: '$userData.userId',
        },
      },
    }, {
      $sort: {
        _id: -1,
      },
    }]);
    return res.json(comments);
  } catch (error) {
    console.error('Get post comments error. ', error);
    return next(error);
  }
});

router.post('/images', upload.array('image'), (req, res, next) => { // POST /api/post/images
  try {
    console.log(req.files);
    return res.json(req.files.map((v) => v.filename));
  } catch (error) {
    console.error('Upload images. ', error);
    return next(error);
  }
});

router.post('/:id/like', async (req, res, next) => { // POST /api/post/:id/like
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $addToSet: {
        likers: req.user.userId,
      },
    }, {
      new: true,
      upsert: true,
      multie: true,
    });
    return res.json(post.toJSON());
  } catch (error) {
    console.error('Like post error. ', error);
    return next(error);
  }
});

router.delete('/:id/unlike', async (req, res, next) => { // POST /api/post/:id/unlike
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $pull: {
        likers: req.user.userId,
      },
    }, {
      new: true,
      upsert: true,
      multie: true,
    });
    return res.json(post.toJSON());
  } catch (error) {
    console.error('Unlike post error. ', error);
    return next(error);
  }
});

module.exports = router;
