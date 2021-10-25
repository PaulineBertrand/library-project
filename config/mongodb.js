const mongoose = require("mongoose");
require("dotenv").config()


mongoose.connect("mongodb://localhost/library-project", {
  useNewUrlParser: true,
//   useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () =>
  console.log("nay db connection error :(")
);