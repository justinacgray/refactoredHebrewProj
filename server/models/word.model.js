const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
  {
    letterName: {
      type: String,
    },
    letterImage: {
      type: String,
    },
    description: {
      type: String,
    },
    meaning: {
      type: String,
    },
    pronounced: {
      type: String,
    },
  },
  { timestamps: true }
);

const Word = mongoose.model("Word", WordSchema);

module.exports = Word;
