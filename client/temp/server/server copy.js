const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cookieParser());

const port = process.env.PORT || 3001;
 
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/public/", express.static(process.cwd() + "/public"));
app.use(
  cors({
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    origin: "http://89.116.191.98",
    optionsSuccessStatus: 200,
    // credentials: true,
  })
);
app.use(express.json());

// const Router = require("./routes/routes");
// Router(app);
app.get("/test/", (req, res) => {


    
  console.log("Test hit, res", req.ip)

  res.json({ msg: "got it hommie"})
})


app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to Database");
  });

  console.log(`Server is running on port: ${port}`);
});



