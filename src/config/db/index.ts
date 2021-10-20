import * as mongoose from "mongoose";

const options: mongoose.ConnectOptions = {
  autoIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    err
  );
  console.log(`[ERRO]: ${err}`);
  process.exit();
});

mongoose.plugin(function (schema) {
  schema.methods.saveAsync = function () {
    return new Promise((resolve, reject) => {
      this.save((err: any) => {
        if (err) return reject(err);
        resolve(this);
      });
    });
  };
  schema.methods.toJson = function () {
    return JSON.parse(JSON.stringify(this.toJSON()));
  };
});

export default mongoose;
