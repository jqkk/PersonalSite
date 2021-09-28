const express = require("express");
const {
  getUserIdByAcessToken,
} = require("../routes/middlewares/getUserIdByAccessToken");
const Post = require("../schemas/post");
const User = require("../schemas/user");

const router = express.Router();

router.post("/write", getUserIdByAcessToken, async (req, res) => {
  const userId = req.userId;
  const accessToken = req.accessToken;
  const { title, content } = req.body;
  await Post.create({
    title: title,
    content: content,
    writer: userId,
    views: 0,
  });
  res.status(200).json({
    res: "success",
    accessToken: accessToken,
  });
});

router.get("/", async (req, res) => {
  const posts = await Post.getPostings();
  res.status(200).json({
    posts: posts,
  });
});

router.get("/content/:id", async (req, res) => {
  const post = await Post.getContent(req.params.id);
  res.status(200).json({
    content: post,
  });
});

router.get("/myposts/:id", async (req, res) => {
  const id = await User.findById(req.params.id);
  const post = await Post.getMyPostings(id);
  res.status(200).json({
    posts: post,
  });
});

router.delete("/:id", getUserIdByAcessToken, async (req, res) => {
  const userId = req.userId;
  const accessToken = req.accessToken;
  //유저아이디와 물품 아이디 비교해 일치하는지 확인
  await Post.remove({ _id: req.params.id });
  res.status(200).json({
    res: "success",
    accessToken: accessToken,
  });
});

module.exports = router;
