const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    trim: true,
  },
  videoLink: {
    type: String,
    required: "Video link is required",
  },
});

module.exports = mongoose.model("Tip", TipSchema);
