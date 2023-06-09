const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to Mongodb database ${mongoose.connection.host}`.america
    );
  } catch (error) {
    console.log(`MongoDb error : ${error.message}`.red.bgWhite);
  }
};

module.exports = connectDb;
