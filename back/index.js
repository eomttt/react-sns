console.log('Process node version', process.version);

const MONGODB_URL = 'mongodb://localhost/reactSNS';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose');

const passportConfig = require('./passport');

const userAPIRouter = require('./routes/user');
const postsApiRouter = require('./routes/posts');
const postApiRouter = require('./routes/post');

mongoose.connect(MONGODB_URL);
dotenv.config();

const app = express();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: true, // Allow all request
  credentials: true, // For transition cookie (cors, axios)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // 매번 세션 강제저장
  saveUninitialized: false, // 빈값도 저장
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'rnbck', // Express 는 쿠키 이름이 connet.sid 이기 때문에 이름 바꾸어주어야함
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsApiRouter);
app.use('/api/post', postApiRouter);

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
