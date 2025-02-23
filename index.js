const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/config/db");
const router = require("./src/routes/index");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());


async function connectDB() {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
        await db.sync({ alter: true });
        console.log("Tables synchronized...");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

connectDB();

app.use(router);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});