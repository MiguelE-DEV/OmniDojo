const cloudinary = require("../middleware/cloudinary");
const JSJoda = require("js-joda");
const LocalDate = JSJoda.LocalDate;
const Post = require("../models/Post");
const Comment = require("../models/Comment")
let options = {provider: 'openstreetmap'};
const nodeGeocoder = require('node-geocoder');
const comments = require("./comments");
const { getProfile } = require("./posts");
const User = require("../models/User");
const geoCoder = nodeGeocoder(options);
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    editProfile: async (req, res) => {
        try{
            const img = await cloudinary.uploader.upload(req.file.path,{
                width: 150, height:150, crop:'scale'
            });
            await User.updateOne(
                { _id: ObjectId(req.user.id)},
                { $set: {image: img.secure_url}}
            )
            res.redirect('/profile')
        } catch (err){
                console.log(err)
                res.redirect('/profile')
            };
        },
        filterBeginner: async (req,res) => {
            try{
                await User.updateOne(
                    {_id: ObjectId(req.user.id)},
                    {$set: {filter: "Beginner"}}
                )
                res.redirect(req.get('referer'));
            } catch (err){
                console.log(err)
                res.redirect(req.get('referer'));
            };
        },
        filterIntermediate: async (req,res) => {
            try{
                await User.updateOne(
                    {_id: ObjectId(req.user.id)},
                    {$set: {filter: "Intermediate"}}
                )
                res.redirect(req.get('referer'));
            } catch (err){
                console.log(err)
                res.redirect(req.get('referer'));
            };
        },
        filterAdvanced: async (req,res) => {
            try{
                await User.updateOne(
                    {_id: ObjectId(req.user.id)},
                    {$set: {filter: "Advanced"}}
                )
                res.redirect(req.get('referer'));
            } catch (err){
                console.log(err)
                res.redirect(req.get('referer'));
            };
        },
        filterUnfilter: async (req,res) => {
            try{
                await User.updateOne(
                    {_id: ObjectId(req.user.id)},
                    {$set: {filter: "Unfiltered"}}
                )
                res.redirect(req.get('referer'));
            } catch (err){
                console.log(err)
                res.redirect(req.get('referer'));
            };
        }
    }