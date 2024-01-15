const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc GET post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    // User not authorized to update post or Post not found
    if (!updatePost)
      return res
        .status(401)
        .json({
          success: false,
          message: "User not authorized to update post or Post not found",
        });

        res.json({success: true, message: 'Update post successfully', updatePost})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc DELETE post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)

    // User not authorized to update post or Post not found
    if (!deletePost)
      return res
        .status(401)
        .json({
          success: false,
          message: "User not authorized to update post or Post not found",
        });

        res.json({success: true, })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

module.exports = router;
