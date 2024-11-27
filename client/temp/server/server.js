const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");


const AboutController = require("./controllers/about.Controller")
const AuthCheck = require("./middleware/jwt");

const UserController = require("./controllers/user.Controller");

const PcRersourcesController = require("./controllers/pcResources.Controller");
const SlideShowController = require("./controllers/slideShow.Controller");
const VoterResources = require("./controllers/voterResources.Controller");
const GetInvolved = require("./controllers/getInvolved.Controller");
const blogPostController = require('./controllers/blogPost.controller');

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

// **********************
app.post("/admin/updates/about/:id", AuthCheck, AboutController.updateAbout);
app.post("/admin/updates/image/:id/", AuthCheck, AboutController.updateImg);
app.post(
  "/admin/updates/pcresources/image/:id/",
  AuthCheck,
  PcRersourcesController.updatePCImg
);
app.post(
  "/admin/updates/pcresources/content/:id/",
  AuthCheck,
  PcRersourcesController.updateContent
);
app.post(
  "/admin/updates/pcresources/name/:id/",
  AuthCheck,
  PcRersourcesController.updateName
);
app.post(
  "/admin/updates/pcresources/pdf/:id/",
  AuthCheck,
  PcRersourcesController.updatePdf
);
app.post(
  "/admin/updates/slideShow/image/home",
  AuthCheck,
  SlideShowController.uploadImg
);
app.delete(
  "/admin/updates/slideShow/image/home/delete/:id",
  AuthCheck,
  SlideShowController.deleteImg
);
app.post(
  "/admin/updates/slideShow/image/home/updateImg/:id",
  AuthCheck,
  SlideShowController.updateImg
);
app.post(
  "/admin/updates/voterResources/content",
  AuthCheck,
  VoterResources.updateContent
);
app.post(
  "/admin/updates/voterResources/rep",
  AuthCheck,
  VoterResources.updateRep
);
app.post(
  "/admin/updates/voterResources/img/:id",
  AuthCheck,
  VoterResources.updateImg
);
app.post(
  "/admin/update/getInvolved/content",
  AuthCheck,
  GetInvolved.updateContent
);
app.post("/admin/update/getInvolved/pdf", AuthCheck, GetInvolved.updatePdf);
app.post(
  "/admin/update/contact/content",
  AuthCheck,
  GetInvolved.updateContactContent
);
app.get("/api/getSite", AboutController.getSite);

app.get("/user/auth", UserController.authCheck);
app.post("/api/login", UserController.login);
app.get("/api/logout", UserController.logout);
app.post("/api/createUser", AuthCheck, UserController.createUser);

app.get('/api/blogPosts', blogPostController.getAllPosts);
app.post('/api/blogPosts', blogPostController.addPost);
// app.post('/api/blogPosts', upload.single('image'), blogPostController.addPost);
app.put('/api/blogPosts/:id', blogPostController.updatePost);
app.delete('/api/blogPosts/:id', blogPostController.deletePost);


// **********************


app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to Database");
  });

  console.log(`Server is running on port: ${port}`);
});



