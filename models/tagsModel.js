const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    name: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Tag", tagSchema)