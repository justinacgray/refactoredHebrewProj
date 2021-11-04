const List = require("../models/list.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.findAllLists = (req, res) => {
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  const userId = decodedJwt.payload._id;
  List.find({ user_id: userId })
    .then((allLists) => res.json({ lists: allLists }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET all the lists",
        error: err,
      })
    );
};

module.exports.findOneSingleList = (req, res) => {
  console.log(req.params.id);
  List.findOne({ _id: req.params.id }) //could be listId or whatever as long as it matches the Routes files
    .populate("word_ids")
    .then((oneSingleList) => res.json({ list: oneSingleList }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET one list",
        error: err,
      })
    );
};

module.exports.createNewList = (req, res) => {
  console.log(req.body);
  const list = new List(req.body);
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  list.user_id = decodedJwt.payload._id;

  List.create(list)
    .then((newlyCreatedList) => res.json({ list: newlyCreatedList }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't CREATE a list",
        error: err,
      })
    );
};

module.exports.updateList = (req, res) => {
  console.log(req.body);
  List.findOne({ _id: req.params.id })
    .then((list) => {
      list.word_ids.push(req.body.letterId);
      list.save();
      res.json({ oneList: list });
      console.log();
    })
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't UPDATE/POST/PUT a list",
        error: err,
      })
    );
};

module.exports.deleteList = (req, res) => {
  console.log("in delete list " + req.params.id);
  List.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log("successful delete");
      res.json({ result: result });
    })
    .catch((err) => {
      //need to add curly if we need to multiple things at a time
      console.log("ERROR!!");
      res.json({
        message: "Something went wrong. Can't DELETE a list",
        error: err,
      });
    });
};
