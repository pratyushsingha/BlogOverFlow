const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    tags: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Tag", tagSchema)