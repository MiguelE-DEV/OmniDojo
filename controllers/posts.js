const cloudinary = require("../middleware/cloudinary");
const JSJoda = require("js-joda");
const LocalDate = JSJoda.LocalDate;
const Post = require("../models/Post");
const Comment = require("../models/Comment")
let options = {provider: 'openstreetmap'};
const nodeGeocoder = require('node-geocoder');
const comments = require("./comments");
const geoCoder = nodeGeocoder(options);
const ObjectId = require('mongodb').ObjectId;


module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); //find user that matches the logged in user
      console.log(posts,req.user)
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreatePost: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); //find user that matches the logged in user
      res.render("createPost.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
      res.redirect(`/post/${req.params.id}`);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" });
      res.render("feed.ejs", { posts: posts, user: req.user, back: req.route.path});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({createdAt:"desc"}) 
      res.render("post.ejs", { post: post, user: req.user, comments: comments});
      console.log(comments)
    } catch (err) {
      console.log(err);
    }
  },getMyPost: async (req, res) => {
    try {
      console.log(req.route.path)
      const posts = await Post.find().sort({ date: "ascending" });
      res.render("mypost.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const img = await cloudinary.uploader.upload(req.file.path,{
        width:600, height:600, crop:'scale' 
      });
      // console.log(img)
      const result = await geoCoder.geocode(req.body.address);
      console.log(result);
      // console.log(req.user)
      await Post.create({
        title: req.body.title,
        address: req.body.address,
        image: img.secure_url,
        cloudinaryId: img.public_id,
        activity: req.body.activity,
        tag: req.body.tag,
        skill: req.body.skill,
        lat: result[0].latitude, 
        lng: result[0].longitude,
        description: req.body.description,
        date: req.body.date,
        comments: req.body.id,
        likes: 0,
        attendance: req.user.userName,
        user: req.user,
        city: result[0].city,
        state: result[0].state, 
      })
      // console.log(req.user)
      console.log("Post has been added!");
      res.redirect("/feed");
      } catch (err) {
        console.log(err);
        res.redirect("/feed");
      }
    },
  attendPost: async(req,res) =>{
      let isExisting = await Post.findOne({ _id: req.params.id, attendance: req.user.userName })
      let query = { _id: req.params.id }
      let update = isExisting ? { $pull: { attendance: req.user.userName } } : { $addToSet: { attendance: req.user.userName } };
    try {
      await Post.updateOne(query,update);
      console.log("You are attending the event");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
    console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
  // deleteComment: async (req, res) => {
  //     try {
  //       // Find comment by id
  //       let Comment = await Comment.find({ _id: req.params.id });
  //       // Delete post from db
  //       await Comment.remove({ _id: req.params.id });
  //       console.log("Deleted Comment");
  //       res.redirect("/post/"+req.params.id);
  //     } catch (err) {
  //       console.log("Couldn't Delete");
  //       res.redirect("/post/"+req.params.id);
  //     }
  //   }
};
