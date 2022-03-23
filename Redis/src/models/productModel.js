const mongoose = require("mongoose");

const productSchema = new mongoose.Schema (
    {
        title : {type: String, required: true},
        price: {type: Number, required: true},
        isAvailable: {type: Boolean, required: true, default: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("product", productSchema);