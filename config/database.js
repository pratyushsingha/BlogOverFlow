const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = async () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("DB connected Successfully"))
        .catch((err) => {
            console.log("DB connection failed", err);
            process.exit(1);
        })
}

module.exports = dbConnect