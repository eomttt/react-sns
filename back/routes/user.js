const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user');

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

router.get('/:id', (req, res) => { // 남의 정보 가져오는 것 ex) GET /api/user/123

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

        console.log('Full user', fullUser[0]);

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

router.get('/:id/posts', (req, res) => {

});

module.exports = router;
