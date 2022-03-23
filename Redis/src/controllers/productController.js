const express = require("express");
const client = require("../configs/redis")
const Product = require("../models/productModel");

const router = express.Router();

router.post("", async (req, res) => {
    try{
        const product = await Product.create(req.body);

        const products = await Product.find({}).lean().exec();

        client.set("products", JSON.stringify(products));

        return res.status(200).send(product);
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }
});

router.get("", async (req, res) => {
    try{
        const page = +req.query.page || 1;
        const pageSize = +req.query.size || 10;

        client.get(`products.${page}.${pageSize}`, async function(err, fetchedProducts) {
            if(fetchedProducts) {
                const products = JSON.parse(fetchedProducts);

                return res.status(201).send({products, redis: true});
            }
            else {
                try{
                    const offset = (page - 1) * pageSize;

                    const products = await Product.find({}).skip(offset).limit(pageSize).lean().exec();

                    client.set(`products.${page}.${pageSize}`, JSON.stringify(products));

                    return res.status(200).send({products, redis: false});
                }
                catch(err) {
                    return res.status(500).send({error: err.message});
                }
            }
        })
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }
});

//getting products using id
router.get("/:id", async (req, res) => {
    try{
        client.get(`products.${req.params.id}`, async function(err, fetchedProducts) {
            if(fetchedProducts) {
                const products = JSON.parse(fetchedProducts);

                return res.status(201).send({products, redis: true});
            }
            else {
                try{
                    const products = await Product.findById(req.params.id).lean().exec();

                    client.set(`products.${req.params.id}`, JSON.stringify(products));

                    return res.status(200).send({products, redis: false});
                }
                catch(err) {
                    return res.status(500).send({error: err.message});
                }
            }
        })
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }
});


router.patch("/:id", async(req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec();

        const products = await Product.find({}).lean().exec();

        client.set(`products.${req.params.id}`, JSON.stringify(product));

        client.set("products", JSON.stringify(products));

        return res.status(200).send(product);
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }
});


router.delete("/:id", async (req, res) => {
    try{
        const product = Product.findByIdAndDelete(req.params.id).lean().exec();

        const products = await Product.find().lean().exec();

        client.del(`products.${req.params.id}`);
        client.set("products", JSON.stringify(products));

        return res.status(200).send({product, deleted: true});
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }
})


module.exports = router;