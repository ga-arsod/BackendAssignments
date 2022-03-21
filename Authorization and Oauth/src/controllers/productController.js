
const express = require("express");

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise")


const Product = require("../models/productModel");
const User = require("../models/userModel");

let id;

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.user._id;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})


router.patch("/:id", authenticate, authorise(["admin","seller"]), async(req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true}).populate("user_id");

        // console.log(req.user);
        // console.log(product.user_id)

        if(req.user.email !== product.user_id.email) {
            throw new Error ("You are not allowed update this product")
        }

        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.delete("/:id", authenticate, authorise(["admin", "seller"]), async(req, res) => {
    try{
        let product = await Product.findOne({id: req.params.id}).populate("user_id").lean().exec();

        console.log(req.user, product.user_id)
        if(req.user.email !== product.user_id.email) {
            throw new Error ("You are not allowed delete this product")
        }
        

        product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        
        return res.status(200).send("Product Deleted Successfully");
    }
    catch(err) {
        return res.status(400).send({message : err.message})
    }
})


router.get("/:id", async (req, res) => {
    try{

        const product = await Product.findById(req.params.id).populate("user_id").lean().exec()

        // console.log(product.user_id)

        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

module.exports = router;