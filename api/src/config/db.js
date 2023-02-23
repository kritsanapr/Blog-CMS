const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
