const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user');
const PostModel = require('../models/post');

const router = express.Router();

router.get('/', (req, res) => { // GET /api/user/
  if (!req.user) {
    return res.status(401).send('Please login');
  }

  const user = { ...req.user };
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => { // POST /api/user 회원가입
  try {
    const exUser = await UserModel.findOne({
      userId: req.body.userId,
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await UserModel.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) GET /api/user/123
  try {
    const fullUser = await UserModel.aggregate([{
      $match: {
        userId: req.params.id,
      },
    }, {
      $lookup: {
        from: 'posts',
        localField: 'userId', // Standard key from now db(User)
        foreignField: 'userId', // Find key by from db(Posts)
        as: 'user_posts',
      },
    }, {
      $project: {
        nickname: '$nickname',
        userId: '$userId',
        followings: '$followings',
        followers: '$followers',
        posts: '$user_posts._id',
      },
    }]).exec();

    return res.json(fullUser[0]);
  } catch (error) {
    console.log('Get user by id error. ', error);
    return next(error);
  }
});

router.post('/logout', (req, res) => { // POST /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('Logout');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginError) => {
      try {
        if (loginError) {
          return next(loginError);
        }
        const fullUser = await UserModel.aggregate([{
          $match: {
            userId: req.user.userId,
          },
        }, {
          $lookup: {
            from: 'posts',
            localField: 'userId', // Standard key from now db(User)
            foreignField: 'userId', // Find key by from db(Posts)
            as: 'user_posts',
          },
        }, {
          $project: {
            nickname: '$nickname',
            userId: '$userId',
            followings: '$followings',
            followers: '$followers',
            posts: '$user_posts._id',
          },
        }]).exec();
        return res.json(fullUser[0]);
      } catch (err) {
        return next(err);
      }
    });
  })(req, res, next);
});

router.get('/:id/follow', (req, res) => { // GET /api/user/:id/follow

});
router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', async (req, res, next) => { // GET /api/user/:id/posts
  try {
    const posts = await PostModel.aggregate([{
      $match: {
        userId: req.params.id,
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

    return res.json(posts);
  } catch (error) {
    console.log('Get user posts error. ', error);
    return next(error);
  }
});

module.exports = router;
