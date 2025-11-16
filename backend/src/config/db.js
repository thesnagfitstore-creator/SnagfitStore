const mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://thesnagfitstore:enkM8C10a2LDe6O9@cluster0.wizntai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
  return mongoose.connect(mondbUrl);
}

module.exports={connectDb}