const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const model = {
  nickname: {
    type: String,
  },
  userId: {
    type: String,
  },
  password: {
    type: String,
  },
  followings: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
};
const userSchema = new Schema(model);

module.exports = mongoose.model('User', userSchema);
