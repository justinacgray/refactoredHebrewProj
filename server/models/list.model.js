const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [2, "First name must be at least 2 charactes long"],
  },
  description: {
    type: String,
  },
  user_id: {
    requried: [true, "User must be logged in"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  word_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
});

const List = mongoose.model("List", ListSchema);
module.exports = List;
