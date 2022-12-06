var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var PatientModel = require("../models/patient.server.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//
const alertType = new GraphQLObjectType({
  name: "emergencyAlert",
  fields: function () {
    return {
      situation: {
        type: GraphQLString,
      },
      contactNumber: {
        type: GraphQLString,
      },
      entryDate: {
        type: GraphQLString,
      },
    };
  },
});

const vitalSignsType = new GraphQLObjectType({
  name: "vitalSigns",
  fields: function () {
    return {
      bodyTemp: {
        type: GraphQLString,
      },
      heartRate: {
        type: GraphQLString,
      },
      bloodPressure: {
        type: GraphQLString,
      },
      respiratoryRate: {
        type: GraphQLString,
      },
      entryDate: {
        type: GraphQLString,
      },
    };
  },
});
// Create a GraphQL Object Type for Patient model
const patientType = new GraphQLObjectType({
  name: "patient",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      vitalSigns: {
        type: GraphQLList(vitalSignsType),
      },
      emegencyAlerts: {
        type: GraphQLList(alertType),
      },
    };
  },
});

//
// create a GraphQL query type that returns all students or a student by id
const queryType = {
  patients: {
    type: new GraphQLList(patientType),
    resolve: async () => {
      const patients = await PatientModel.find().exec();
      if (!patients) {
        throw new Error("Error");
      }
      return patients;
    },
  },
  patient: {
    type: patientType,
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const patientInfo = await PatientModel.findById(params.id).exec();
      if (!patientInfo) {
        throw new Error("Error");
      }
      return patientInfo;
    },
  },
};

//
// add mutations for CRUD operations
const mutation = {
  addPatient: {
    type: patientType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const patientModel = new PatientModel(params);
      const newPatient = await patientModel.save();
      if (!newPatient) {
        throw new Error("Error");
      }
      return newPatient;
    },
  },
  updatePatient: {
    type: patientType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const hashed = await bcrypt.hash(params.password, saltRounds);
      return await PatientModel.findByIdAndUpdate(
        params.id,
        {
          username: params.username,
          firstName: params.firstName,
          lastName: params.lastName,
          password: hashed,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },
  deletePatient: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const deletedPatient = await PatientModel.findByIdAndRemove(
        params.id
      ).exec();
      if (!deletedPatient) {
        throw new Error("Error");
      }
      return deletedPatient;
    },
  },
  updateVitalSigns: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      bodyTemp: {
        type: new GraphQLNonNull(GraphQLString),
      },
      heartRate: {
        type: new GraphQLNonNull(GraphQLString),
      },
      bloodPressure: {
        type: new GraphQLNonNull(GraphQLString),
      },
      respiratoryRate: {
        type: new GraphQLNonNull(GraphQLString),
      },
      entryDate: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      // console.log(params);
      const patient = await PatientModel.findByIdAndUpdate(params.id, {
        $addToSet: {
          vitalSigns: {
            bodyTemp: params.bodyTemp,
            heartRate: params.heartRate,
            bloodPressure: params.bloodPressure,
            respiratoryRate: params.respiratoryRate,
            entryDate: params.entryDate,
          },
        },
      }).exec();
      // console.log(patient);
      if (!patient) {
        throw new Error("Error");
      }
      return patient;
    },
  },
  updateEmegencyAlert: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      situation: {
        type: new GraphQLNonNull(GraphQLString),
      },
      contactNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      entryDate: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      // console.log(params);
      const patient = await PatientModel.findByIdAndUpdate(params.id, {
        $addToSet: {
          emegencyAlerts: {
            situation: params.situation,
            contactNumber: params.contactNumber,
            entryDate: params.entryDate,
          },
        },
      }).exec();
      if (!patient) {
        throw new Error("Error");
      }
      return patient;
    },
  },
};

//
module.exports = { patientQuery: queryType, patientMutation: mutation };
