//Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

//Define a new StudentSchema
var PatientSchema = new Schema({
  // studentNumber: String,
  username: {
    type: String,
    // Set a unique 'username' index
    unique: true,
    // Validate 'username' value existance
    required: "Username is required",
    // Trim the 'username' field
    trim: true,
  },
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  password: {
    type: String,
    // Validate 'password' value existance
    required: "Passwod is required",
    // Trim the 'password' field
    trim: true,
    // Validate the password format
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
  vitalSigns: [
    {
      bodyTemp: {
        type: String,
        required: "Body temperature is required",
      },
      heartRate: {
        type: String,
        required: "Heart rate is required",
      },
      bloodPressure: {
        type: String,
        required: "Blood pressure is required",
      },
      respiratoryRate: {
        type: String,
        required: "Respiratory rate is required",
      },
      entryDate: {
        type: String,
      },
    },
  ],
  emegencyAlerts: [
    {
      situation: {
        type: String,
        required: "Situation/Description is required",
      },
      contactNumber: {
        type: String,
        required: "Contact number is required",
      },
      entryDate: {
        type: String,
      },
    },
  ],
});

//Set the fullname virtual property
PatientSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

//Use pre-save middleware to hash the password
//before saving it into database
PatientSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

//Configure the StudenSchema to use gtters
//virtuals when transformin to JSON
PatientSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

//Create the Student model out of the StudentSchema
module.exports = mongoose.model("Patient", PatientSchema);
