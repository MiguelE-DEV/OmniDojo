const Comment = require("../models/Comment")
const User = require("../models/User");
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    createComment: async (req, res) => {
      try {
        await Comment.create({
          _id: req.body.id,
          comment: req.user.userName+": "+req.body.comment,
          likes: req.user.userName,
          post: req.params.id,
          user: req.user.id
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.id);
      } catch (err) {
        console.log(err);
      }
  },
  likeComment: async (req, res) => {
    let isExisting = await Comment.findOne({ _id: ObjectId(req.params.id), likes: req.user.userName }) //mongo can search for mID in array of [mIDs]
    let query = { _id: ObjectId(req.params.id) }
    let update = isExisting ? { $pull: { likes: req.user.userName } } : { $addToSet: { likes: req.user.userName } };
    try {
      await Comment.updateOne(query, update)
      console.log("You Liked the Comment");
      res.redirect(`/post/${req.body.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
    deleteComment: async (req, res) => {
      console.log(req.params)  
      try {
          // Find comment by id
          // let Comment = await Comment.find({ _id: ObjectId(req.params.id) });
          // Delete post from db
          await Comment.remove({ _id: ObjectId(req.params.id)});
          console.log("Deleted Comment");
          res.redirect(`/post/${req.body.postId}`);
        } catch (err) {
          console.log("Couldn't Delete");
          res.redirect("/post/"+req.body.postId);
        }
      }
}
