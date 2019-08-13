const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const model = {
  userId: {
    type: String,
  },
  postId: {
    type: String,
  },
  content: {
    type: Array,
  },
};
const commentSchema = new Schema(model);

module.exports = mongoose.model('Comment', commentSchema);
