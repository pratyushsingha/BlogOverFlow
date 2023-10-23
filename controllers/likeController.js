const Like = require('../models/likeModel');
const Blog = require('../models/blogModel');

exports.createLike = async (req, res) => {
    try {
        const { blog, user } = req.body;
        const response = await Like.create({
            blog,
            user
        });
        const updateBlog = await Blog.findByIdAndUpdate(blog,
            { $push: { "likes": response._id } },
            { new: true }
        ).populate("likes").exec();
        res.status(200).json({
            success: true,
            blog: updateBlog,
            message: "Like added successfully"
        })
    } catch (err) {
        console.log("err :: createLike :: ", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.createUnlike = async (req, res) => {
    try {
        const { blog, like } = req.body;
        const response = await Like.findOneAndDelete({ blog: blog, _id: like });

        const updatedBlog = await Blog.findByIdAndUpdate(
            blog,
            { $pull: { likes: response._id } },
            { new: true }
        );

        res.json({
            success: true,
            blog: updatedBlog,
            message: "blog disliked successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: "Error While unLike Blog",
        });
    }
};