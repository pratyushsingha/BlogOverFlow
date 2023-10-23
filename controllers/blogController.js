const Blog = require('../models/blogModel');

exports.createBlog = async (req, res) => {
    try {
        const { title, author, body } = req.body;
        const response = await Blog.create({
            title, author, body
        });
        res.status(200).json({
            status: "success",
            data: response,
            message: "blog created successfully"
        });
    } catch (err) {
        console.error("error :: createBlog :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    };
};

exports.getBlog = async (req, res) => {
    try {
        const response = await Blog.find({}).populate("comments").populate("likes").exec();
        res.status(200).json({
            status: "success",
            data: response,
            message: "blogs fetched successfully"
        });
    } catch (err) {
        console.error("error :: getBlog :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    };
};

exports.editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, body } = req.body;
        const response = await Blog.findByIdAndUpdate(
            { _id: id },
            { title, author, body, updatedAt: Date.now() }
        );
        if (!response) {
            res.status(404).json({
                status: "fail",
                data: null,
                message: "blog not found"
            });
        }
        else {

            res.status(200).json({
                status: "success",
                data: response,
                message: "blog updated successfully"
            });
        }
    } catch (err) {
        console.error("error :: editBlog :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.removeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Blog.findByIdAndDelete(id);
        if (!response) {
            res.status(404).json({
                success: false,
                data: null,
                message: "blog not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: response,
                message: "blog deleted successfully"
            })
        }
    } catch (err) {
        console.error("error :: removeBlog :: ", err.message);
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}