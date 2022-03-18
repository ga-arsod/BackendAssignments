const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.post("", async (req, res) => {
    try{

    }
    catch(err) {
        res.status(500).send({error: err});
    }
});

module.exports = router;