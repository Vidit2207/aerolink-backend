const mongoose = require("mongoose");
const { PrismLogger } = require("prism-logger");

// const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
// const MONGODB_URI = process.env.MONGODB_URI.replace(
//   "{{DB_NAME}}",
//   MONGODB_DATABASE_NAME
// );

// const connectToServer = async (app, port) => {
//   try {
//     // const isDBConnected = await mongoose.connect(MONGODB_URI);

//     // if (!isDBConnected) {
//     //   PrismLogger.error("MongoDB Connection Failed");
//     //   throw new Error("MongoDB Connection Failed");
//     // }
//     // PrismLogger.successBg(
//     //   "Connected to MongoDB Server. Database: " + MONGODB_DATABASE_NAME
//     // );
//     const isServerConnected = await app.listen(port);
//     if (!isServerConnected) {
//       PrismLogger.error("Server Connection Failed");
//       throw new Error("Server Connection Failed");
//     }
//     PrismLogger.successBg("Server is listening at port: " + port);
//   } catch (error) {
//     PrismLogger.errorBg("Error in Mongoose Connection");
//     PrismLogger.error(error);
//   }
// };

// const clearAllCollections = async () => {
//   try {
//     const collections = await mongoose.connection.db
//       .listCollections()
//       .toArray();

//     for (const collection of collections) {
//       const modelName = collection.name;
//       const Model = mongoose.model(modelName);

//       await Model.deleteMany({});
//       PrismLogger.success(`Deleted all documents in collection: ${modelName}`);
//     }

//     PrismLogger.successBg("All collections cleared.");
//   } catch (error) {
//     PrismLogger.errorBg("Error clearing collections");
//     PrismLogger.error(error);
//   }
// };

// module.exports = { connectToServer, clearAllCollections };


class Database{
  URI = null;
  DB_NAME = null;

  constructor(uri = undefined, db_name = undefined){
      this.URI = uri || process.env.MONGODB_URI
      this.DB_NAME = db_name || process.env.MONGODB_DATABASE_NAME
  }

  async connect(){
    try {
      const connectionURL = this.URI.replace("{{DB_NAME}}", this.DB_NAME);
      const connection = await mongoose.connect(connectionURL)
      if(!connection){
        throw new Error("Database Connection Failed: "+this.DB_NAME);
      }
      console.log("Connected to Database: "+this.DB_NAME);
    } catch (error) {
      console.log("Error in Database Config - Connect")
      console.log(error)
    }

  }

  async format(){
    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
  
      for (const collection of collections) {
        const modelName = collection.name;
        const Model = mongoose.model(modelName);
  
        await Model.deleteMany({});
        PrismLogger.success(`Deleted all documents in collection: ${modelName}`);
      }
  
      PrismLogger.successBg("All collections cleared.");
    } catch (error) {
      PrismLogger.errorBg("Error clearing collections");
      PrismLogger.error(error);
    }
  }
}

module.exports = Database