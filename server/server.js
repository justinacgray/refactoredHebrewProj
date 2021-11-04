require("dotenv").config();

//bringing in packages/libraries
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
// const uuidv4 = require("uuid/v4");
// // const multer3 = require("multer-s3");
// // const aws = require("aws-sdk");

// const DIR = "./public/";

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, DIR);
//   },
//   filename: (req, file, callback) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, uuidv4() + "-" + fileName);
//   },
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

app.use(express.static("public"));
// const port = 8000;

//configure things
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./config/mongoose.controller")(process.env.DB_NAME);
//routes should be one of the last things used
require("./routes/user.routes")(app);
require("./routes/word.routes")(app);
require("./routes/list.routes")(app);

app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port: ${process.env.DB_PORT}`)
);
