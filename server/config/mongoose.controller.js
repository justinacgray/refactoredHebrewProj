const mongoose = require("mongoose");
const db_name = "hebrew_app";

module.exports = (db_name) => {
  mongoose
    .connect("mongodb://localhost/" + db_name, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then(() =>
      console.log(
        `WE IN HERE! Established connection to the ${db_name} database. YAY!`
      )
    )
    .catch((err) =>
      console.log(
        `WHOP WHOP...Something went wrong when connecting to the ${db_name} database:`,
        err
      )
    );
};
