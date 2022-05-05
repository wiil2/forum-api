const mongoose = require("mongoose");

async function connect() {
  try {
    const dbConfig = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect to the db:", dbConfig.connections[0].name);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
