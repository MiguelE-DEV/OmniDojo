const express = require("express");
const JSJoda = require("js-joda")
const LocalDate = JSJoda.LocalDate;
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now
//:id creates a variable for id
router.post("/createComment/:id", commentsController.createComment);

router.put("/editProfile/:id", upload.single("file"), profileController.editProfile);
router.put("/filterBeginner/:id", profileController.filterBeginner)
router.put("/filterIntermediate/:id", profileController.filterIntermediate)
router.put("/filterAdvanced/:id", profileController.filterAdvanced)
router.put("/filterUnfilter/:id", profileController.filterUnfilter)

router.put("/likeComment/:id", commentsController.likeComment);

router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
