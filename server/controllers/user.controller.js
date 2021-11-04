const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    console.log("register");
    const user = new User(req.body);
    console.log(req.body);
    user
      .save()
      .then(() => {
        res.json({ msg: "success!", user: user });
      })
      .catch((err) => res.status(400).json(err));
  },

  login(req, res) {
    //do they exist in db
    //typicall use emails for uniqueness
    User.findOne({ userName: req.body.userName })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ msg: "invalid login attempt 1" });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              console.log("Password is valid");
              if (passwordIsValid) {
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      { _id: user._id, userName: user.userName },
                      process.env.JWT_SECRET
                    ),
                    {
                      httpOnly: true,
                      expires: new Date(Date.now() + 900000000),
                    }
                  )
                  .json({
                    msg: "Successfully logged in!",
                    userLoggedIn: {
                      userName: user.userName,
                    },
                  });
              } else {
                res.status(400).json({ msg: "invalid login attempt 2" });
              }
            })
            .catch((err) =>
              res.status(400).json({ msg: "invalid login attempt 3" })
            );
        }
      })
      .catch((err) => res.json(err));
  },

  // logout(req, res) {
  //   res
  //     .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
  //       httpOnly: true,
  //       maxAge: 0,
  //     })
  //     .json({ msg: "ok" });
  // },
  logout(req, res) {
    res.clearCookie("usertoken");
    res.json({ msg: "usertoken cookie cleared" });
  },

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  getAll(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  getOne(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};
