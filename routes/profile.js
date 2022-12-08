const express = require("express");
const JSJoda = require("js-joda")
const LocalDate = JSJoda.LocalDate;
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//for profile
router.put("/editProfile/:id", upload.single("file"), profileController.editProfile);
router.put("/filterBeginner/:id", profileController.filterBeginner)
router.put("/filterIntermediate/:id", profileController.filterIntermediate)
router.put("/filterAdvanced/:id", profileController.filterAdvanced)
router.put("/filterUnfilter/:id", profileController.filterUnfilter)

module.exports = router;