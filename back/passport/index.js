const passport = require('passport');
const local = require('./local');

const UserModel = require('../models/user');

module.exports = () => {
  // req.login 할 때 실행, 서버쪽에 [{id: 3, cookie: 'asdfgh'}]
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log('Serialize', user.userId);
    return done(null, user.userId); // 여기의 user.userId가 req.session.passport.user에 저장
  });

  passport.deserializeUser(async (id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    try {
      console.log('Deserialize', id);

      const user = await UserModel.aggregate([{
        $match: {
          userId: id,
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
      }]);

      return done(null, user[0]); // req.user
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보내요(asdfgh)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱
