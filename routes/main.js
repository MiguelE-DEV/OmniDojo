const express = require("express");
const JSJoda = require("js-joda")
const LocalDate = JSJoda.LocalDate;
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/index", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/createPost", ensureAuth, postsController.getCreatePost,)
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/mypost", ensureAuth, postsController.getMyPost);

// req for login
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
