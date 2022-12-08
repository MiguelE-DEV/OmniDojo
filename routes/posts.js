const express = require("express");
const JSJoda = require("js-joda")
const LocalDate = JSJoda.LocalDate;
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
//:id creates a variable for id
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

// router.put("/likePost/:id", postsController.likePost);

router.put("/attendPost/:id", postsController.attendPost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
