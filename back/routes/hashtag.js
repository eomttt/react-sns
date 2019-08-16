const express = require('express');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const PostModel = require('../models/post');
const HashtagModel = require('../models/hashTag');

const router = express.Router();

router.get('/:tag', async (req, res, next) => { // GET /api/hashtag/:tag
  try {
    const hashTag = await HashtagModel.findOne({
      content: `#${decodeURIComponent(req.params.tag)}`,
    });

    if (hashTag) {
      const posts = await Promise.all(hashTag.posts.map(async (postId) => {
        const fullPost = await PostModel.aggregate([{
          $match: {
            _id: new ObjectId(postId),
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
        }, {
          $sort: {
            _id: -1,
          },
        }]);
  
        return fullPost[0];
      }));
      return res.json(posts);
    }
    return res.json([]);
  } catch (error) {
    console.error('Get hashtagposts error.', error);
    next(error);
  }
});

module.exports = router;
