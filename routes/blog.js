const express = require('express');

const router = express.Router();

const { createBlog, getBlog, editBlog, removeBlog } = require('../controllers/blogController');
const { createComment, removeComment, editComment } = require('../controllers/commentController');
const { createLike } = require('../controllers/likeController');
const { createUnlike } = require('../controllers/likeController');


router.post("/blog/create", createBlog);
router.get("/blogs", getBlog);
router.put("/blog/edit/:id", editBlog);
router.delete("/blog/remove/:id", removeBlog);

router.post("/comment/create", createComment);
router.post("/comment/remove", removeComment);
router.put("/comment/edit/:id", editComment);

router.post("/like/create", createLike);
router.post("/like/remove", createUnlike);

module.exports = router;