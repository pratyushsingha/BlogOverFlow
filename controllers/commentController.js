const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try {
        const { blog, user, body } = req.body;
        const response = await Comment.create({
            blog,
            user,
            body
        });
        const updateBlog = await Blog.findByIdAndUpdate(blog,
            { $push: { comments: response._id } }, { new: true }
        ).populate("comments").exec();

        res.status(200).json({
            status: "success",
            blog: updateBlog,
            message: "comment created successfully"
        });
    } catch (err) {
        console.log("error :: createComment :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.removeComment = async (req, res) => {
    try {
        const { blog, comment } = req.body;

        const response = await Comment.findOneAndDelete({ blog: blog, _id: comment });
        const updateBlog = await Blog.findByIdAndUpdate(blog,
            { $pull: { "comments": response._id } }, { new: true }).populate("comments").exec();

        res.status(200).json({
            status: "success",
            blog: updateBlog,
            message: "comment deleted successfully"
        })
    }
    catch (err) {
        console.log("error :: removeComment :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}
// todo:blog::editComment :: is comming null...but comment is updating
exports.editComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { blog, body } = req.body;
        const response = await Comment.findByIdAndUpdate(
            { _id: id },
            { body, updatedAt: Date.now() }
        );
        const updatedBlog = await Blog.findByIdAndUpdate(blog,

            { $push: { comments: response._id } }, { new: true }
        ).populate("comments").exec();
        res.status(200).json({
            status: "success",
            blog: updatedBlog,
            message: "comment updated successfully"
        });
    } catch (err) {
        console.log("error :: editComment :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}
