
const express = require("express")
const bodyparser = require("body-parser")
require('dotenv').config({ path: './.env' });

const path = require("path");
const cors = require("cors")
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());



app.use(cors());
app.use("/api/device", require("./routers/api/device"));
// app.use("/api/user/projects",require("./routers/api/projects"));


console.log(process.env.NODE_ENV)


if (process.env.NODE_ENV !== 'production') {


    app.get("/", (req, res) => {


        res.send("hello");

    });

}

// app.use(express.static(path.join(__dirname, "client/build")));

//     app.get("/*", (req, res) => {
//         res.sendFile(path.join(__dirname, "client/build/index.html"), err => {
//             res.status(500).send(err);
//         });
//     });


app.listen(port, console.log(`server is running on ${port}..........`));

module.exports = app;