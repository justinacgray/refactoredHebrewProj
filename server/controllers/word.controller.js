const Word = require("../models/word.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.findAllWords = (req, res) => {
  console.log("in find all words");
  Word.find()
    .then((allWords) => {
      console.log(allWords);
      res.json({ words: allWords });
    })
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET all the words",
        error: err,
      })
    );
};

module.exports.findOneSingleWord = (req, res) => {
  Word.findOne({ _id: req.params.id })
    .then((oneSingleWord) => res.json({ word: oneSingleWord }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET one word",
        error: err,
      })
    );
};

module.exports.createNewWord = (req, res) => {
  Word.create(req.body) // used .body b/c of new info
    .then((newlyCreatedWord) => res.json({ word: newlyCreatedWord }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't CREATE a word",
        error: err,
      })
    );
};

//   const url = req.protocol + "://" + req.get("host");
//   const word = new Word({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     letterImage: url + "/public/" + req.file.filename,
//   });
//   user
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         message: "Word Created!",
//         userCreated: {
//           _id: result._id,
//           letterImage: result.letterImage,
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err),
//         res.status(500).json({
//           error: err,
//         });
//     });
// };

module.exports.updateWord = (req, res) => {
  Word.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedWord) => res.json({ word: updatedWord }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't UPDATE/POST/PUT a word",
        error: err,
      })
    );
};

module.exports.deleteWord = (req, res) => {
  Word.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't DELETE a word",
        error: err,
      })
    );
};
