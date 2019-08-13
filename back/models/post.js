const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const model = {
  userId: {
    type: String,
  },
  content: {
    type: String,
  },
};
const postsSchema = new Schema(model);

module.exports = mongoose.model('Post', postsSchema);
