const mongoose = require('mongoose');
MONGO_URI = "mongodb://127.0.0.1/inotebook";
const connectToMongo = async () => {
    try {
      let result = await mongoose.connect(MONGO_URI);
      console.log("Connected to mongo successfully");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };

module.exports = connectToMongo;