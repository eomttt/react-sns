const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const model = {
  content: {
    type: String,
  },
  posts: {
    type: Array,
    default: [],
  },
};
const hashTagSchema = new Schema(model);

module.exports = mongoose.model('HashTag', hashTagSchema);
