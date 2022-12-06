//Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

//Define a new NurseSchema
var NurseSchema = new Schema({
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  username: {
    type: String,
    // Set a unique 'username' index
    unique: true,
    // Validate 'username' value existance
    required: "first name is required",  
  },
  password: {
    type: String,
    // Validate 'password' value existance
   
    // Trim the 'password' field
    trim: true,
    // Validate the password format
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
});

//Use pre-save middleware to hash the password
//before saving it into database
NurseSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

//Configure the StudenSchema to use gtters
//virtuals when transformin to JSON
NurseSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

//Create the Nurse model out of the NurseSchema
module.exports = mongoose.model("Nurse", NurseSchema);
