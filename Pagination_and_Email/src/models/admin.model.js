const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        userID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Admin = mongoose.model("user", adminSchema);

module.exports = Admin;