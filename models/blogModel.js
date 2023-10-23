const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    author: {
        type: String,
        required: true,
        maxLength: 50
    },
    body: {
        type: String,
        required: true,
        maxLength: 1000
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Blog", blogSchema);