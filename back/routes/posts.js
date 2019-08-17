const express = require('express');

const PostModel = require('../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts/
  try {
    const posts = await PostModel.aggregate([{
      $match: {},
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

    res.json(posts);
  } catch (error) {
    console.error('Get posts error.', error);
    next(error);
  }
});

module.exports = router;
