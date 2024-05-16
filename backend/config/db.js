const mongoose = require("mongoose");

const db = () => {
  mongoose.connect('mongodb+srv://salihmirza123:MirzaSahin123.@cluster1.9qxi58p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
    useNewUrlParser: true, // After version 6, this setting began to be adopted as the default.
    useUnifiedTopology: true // After version 6, this setting began to be adopted as the default.
  }).then(() => {
    console.log("Connected to MongoDB..");
  }).catch((error) => {
    console.log(error);
  })
};

module.exports = db;
