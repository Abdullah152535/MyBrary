const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
},{collection:"users"});
const User = mongoose.model("User", userSchema);
module.exports = User;