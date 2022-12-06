var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;

var { patientQuery, patientMutation } = require("./patientSchemas");
var { tipQuery, tipMutation } = require("./tipSchemas");
var { loginQuery, loginMutation } = require("./loginSchemas");
var { nurseQuery, nurseMutation } = require("./nurseSchemas");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      ...patientQuery,
      ...tipQuery,
      ...loginQuery,
      ...nurseQuery,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      ...patientMutation,
      ...tipMutation,
      ...loginMutation,
      ...nurseMutation,
    };
  },
});

//
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
