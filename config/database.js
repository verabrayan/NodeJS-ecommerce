const mongoose = require("mongoose");
const config = require("./index");

const MONGODB_URI_CLUSTER = `mongodb+srv://${config.db_user}:${config.password_db}@cluster0.eayxd.mongodb.net/${config.db_name}`;

const connection = async () => {
  const conn = await mongoose.connect(MONGODB_URI_CLUSTER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB is connected", conn.connection.host);
};

module.exports = { connection, mongoose };
