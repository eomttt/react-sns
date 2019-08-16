const express = require('express');

const PostModel = require('../models/post');
const HashTagModel = require('../models/hashTag');
const CommentModel = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post/
  try {
    const hashTags = req.body.text.match(/#[^\s]+/g);
    const newPost = await PostModel.create({
      content: req.body.text,
      userId: req.user.userId,
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

module.exports = router;
