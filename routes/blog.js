const express = require('express');

const router = express.Router();

const { createBlog, getBlog, editBlog, removeBlog } = require('../controllers/blogController');
const { createComment, removeComment, editComment } = require('../controllers/commentController');
const { createLike } = require('../controllers/likeController');
const { createUnlike } = require('../controllers/likeController');
const { createTag, removeTag, editTag } = require('../controllers/tagsController');


router.post("/blog/create", createBlog);
router.get("/blogs", getBlog);
router.put("/blog/edit/:id", editBlog);
router.delete("/blog/remove/:id", removeBlog);

router.post("/comment/create", createComment);
router.post("/comment/remove", removeComment);
router.put("/comment/edit/:id", editComment);

router.post("/like/create", createLike);
router.post("/like/remove", createUnlike);

router.post("/tags/create", createTag);
router.post("/tags/remove", removeTag);
router.put("/tags/edit/:id", editTag);


module.exports = router;