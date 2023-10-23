const Tag = require('../models/tagsModel');
const Blog = require('../models/blogModel');

exports.createTag = async (req, res) => {
    try {
        const { blog, tags } = req.body;
        const response = await Tag.create({
            blog,
            tags
        })
        const updateBlog = await Blog.findByIdAndUpdate(blog,
            { $push: { "tags": response._id } },
            { new: true }
        ).populate("tags").exec();
        res.status(200).json({
            success: true,
            blog: updateBlog,
            message: "Tag added successfully"
        })
    } catch (err) {
        console.log("error :: createTag :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    };
};

exports.removeTag = async (req, res) => {
    try {
        const { blog, tags } = req.body;
        const response = await Tag.findOneAndDelete({ blog: blog, _id: tags });
        const updateBlogs = await Blog.findByIdAndUpdate(blog,
            { $pull: { "tags": response._id } }, { new: true }).populate("tags").exec();
        res.status(200).json({
            status: "success",
            blog: updateBlogs,
            message: "Tag deleted successfully"
        })
    }
    catch (err) {
        console.log("error :: removeTag :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    };
};

exports.editTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { blog, tags } = req.body;
        const response = await Tag.findByIdAndUpdate(
            { _id: id },
            { tags, updatedAt: Date.now() }
        )
        const updatedBlog = await Blog.findByIdAndUpdate(blog,
            { $push: { "tags": response._id } }, { new: true }
        ).populate("tags").exec();
        res.status(200).json({
            status: "success",
            blog: updatedBlog,
            message: "Tag updated successfully"
        })
    }
    catch (err) {
        console.log("error :: editTag :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}