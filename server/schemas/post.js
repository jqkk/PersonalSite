const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  views: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
});

postSchema.statics.getPostings = async function () {
  const posts = await Post.find()
    .sort("-createdAt")
    .populate({ path: "writer", select: "nickname -_id" })
    .select("title writer  views createdAt ");
  const result = [];
  for (let i = 0; i < posts.length; i += 10) {
    result.push(posts.slice(i, i + 10));
  }
  return result;
};

postSchema.statics.getContent = async function () {};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
