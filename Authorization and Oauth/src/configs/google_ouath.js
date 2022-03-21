const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const { v4: uuidv4 } = require('uuid');

const User = require("../models/userModel")

require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    let user = await User.findOne({email : profile?._json?.email}).lean().exec()

    if(!user){
        user = await User.create({
            name: profile._json.name,
            email : profile._json.email,
            password : uuidv4(), 
            role : ["customer"]
        })
    }
    // console.log(profile);

    console.log(user)
    return cb(null, user);
  }
));

module.exports = passport;