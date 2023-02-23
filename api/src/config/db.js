// Function to connect mnogodb database and export it.
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

console.log(MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
