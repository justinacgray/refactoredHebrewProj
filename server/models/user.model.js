const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 charactes long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 charactes long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Email is invalid. Please check and re-enter",
      },
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      minlength: [6, "Username must be at least 6 charactes long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Last name must be at least 2 charactes long"],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 12).then((hash) => {
    this.password = hash;
    next();
  });
});

// module.exports = mongoose.model("User", UserSignUpSchema);
const User = mongoose.model("User", UserSchema);

module.exports = User;
