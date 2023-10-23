const express = require('express');

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`server is running at ${PORT} `);
});

const blogRoutes = require("./routes/blog");
app.use("/api/v1", blogRoutes);

const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => res.send(
    `<h1>welcome to stackBlog api homepage</h1>`
));