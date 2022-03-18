const path = require("path");

const transporter = require("../configs/mail");

const express = require("express");
const User = require("../models/user.models");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      transporter.sendMail({
        from: '"ABC company', // sender address
        to: user.email, // list of receivers
        subject: `Welcome to ABC systems ${user.firstName}`, // Subject line
        text: `Hi ${user.firstName}, Please confirm your email adress.`, // plain text body
          html: "", // html body
      });
  
      return res.status(201).send({ message: "Product created successfully" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  
module.exports = router;