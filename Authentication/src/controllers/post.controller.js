const express = require("express");
const authenticate = require("../middleware/authenticate");
const Posts = require("../models/post.model");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
    req.body.userID = req.userID;

    try{
        const post = await Posts.create(req.body);

        return res.status(200).send(post);
    }
    catch(err) {
        return res.status(500).send({error : err});
    }
});


router.get("", authenticate, async (req, res) => {
    req.body.userID = req.userID;

    try{
        const post = await Posts.find({}).lean().exec();

        return res.status(200).send(post);
    }
    catch(err) {
        return res.status(500).send({error : err});
    }
});



router.delete("/:id", authenticate, async (req, res) => {
    req.body.userID = req.userID;

    try{
        const post = await Posts.findByIdAndDelete(req.params.id).lean().exec();

        console.log("Deleted the post successfully");
        return res.status(200).send(post);
    }
    catch(err) {
        return res.status(500).send({error : err});
    }
});


router.patch("/:id", authenticate, async (req, res) => {
    req.body.userID = req.userID;

    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).populate("userID").lean().exec();

        return res.status(200).send(post);
    }
    catch(err) {
        return res.status(500).send({error : err});
    }
});



module.exports = router;