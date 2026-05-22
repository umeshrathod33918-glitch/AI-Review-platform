const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    review: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);