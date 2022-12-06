var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var PatientModel = require("../models/patient.server.model");
var NurseModel = require("../models/nurse.server.model");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var private_key = require("../helpers/keys.js");
//
// Create a GraphQL Object Type for login
const userType = new GraphQLObjectType({
  name: "user",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
    };
  },
});

const postType = new GraphQLObjectType({
  name: "post",
  fields: function () {
    return {
      title: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
    };
  },
});

const loginReturnType = new GraphQLObjectType({
  name: "loginReturn",
  fields: function () {
    return {
      userId: {
        type: GraphQLString,
      },
      token: {
        type: GraphQLString,
      },
      userType: {
        type: GraphQLString,
      },
    };
  },
});

// create a GraphQL query type that returns all courses or a course by id
const queryType = {
  user: {
    type: new GraphQLList(userType),
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async ({ userId }, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const userInfo = PatientModel.findById(userId).exec();
      if (!userInfo) {
        throw new Error("Error");
      }

      return userInfo;
    },
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async (_, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      return [
        { title: "accident", description: "accident ocurred" },
        { title: "Laptop", description: "Buy A new Laptop" },
      ];
    },
  },
};

const mutation = {
  login: {
    type: loginReturnType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      userType: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      try {
        var user;
        if (params.userType === "patient") {
          user = await PatientModel.findOne({
            username: params.username,
          });
        }
        if (params.userType === "nurse") {
          user = await NurseModel.findOne({
            username: params.username,
          });
        }
        if (!user) {
          throw new Error("Invalid Credentials!user");
        }
        const id = user._id;
        const type = params.userType;
        const isCorrectPassword = await bcrypt.compare(
          params.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials!password");
        }
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          private_key,
          {
            algorithm: "RS256",
          }
        );
        return {
          userId: id,
          token,
          userType: type,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

//
module.exports = { loginQuery: queryType, loginMutation: mutation };
