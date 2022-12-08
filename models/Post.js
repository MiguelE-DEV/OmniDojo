const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  activity:{
    type: String,
    required: false,
  },
  tag:{
    type: Array,
    required: false
  },
  description: {
    type: String,
    required: true,
  },
  skill:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: false
  },
  city:{    
    type: String,
    required: true
  },
  state: {    
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  lat:{
    type: Number,
    required: true
  },
  lng:{
    type: Number,
    required: true
  },
  user: {
    type: Object,
    required: true
    // ref: "User",
  },
  attendance:{
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Post", PostSchema);
