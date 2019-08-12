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


mongoose.connect(MONGODB_URL);
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.json('GOOD');
})

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});
