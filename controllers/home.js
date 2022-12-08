const { ensureAuth, ensureGuest } = require("../middleware/auth");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
