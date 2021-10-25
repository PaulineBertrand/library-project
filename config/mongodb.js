const mongoose = require("mongoose");
require("dotenv").config()
console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
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