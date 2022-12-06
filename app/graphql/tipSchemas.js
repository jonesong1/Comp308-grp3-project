var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var TipModel = require("../models/tip.server.model");
//
// Create a GraphQL Object Type for Course model
const tipType = new GraphQLObjectType({
  name: "tip",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      title: {
        type: GraphQLString,
      },
      videoLink: {
        type: GraphQLString,
      },
    };
  },
});
//
// create a GraphQL query type that returns all courses or a course by id
const queryType = {
  tips: {
    type: new GraphQLList(tipType),
    resolve: async () => {
      const tips = await TipModel.find().exec();
      if (!tips) {
        throw new Error("Error");
      }
      return tips;
    },
  },
  tip: {
    type: tipType,
    args: {
      id: {
        name: "_id",
        type: GraphQLString,
      },
    },
    resolve: async (root, params) => {
      const tipInfo = await TipModel.findById(params.id).exec();
      if (!tipInfo) {
        throw new Error("Error");
      }
      return tipInfo;
    },
  },
};

const mutation = {
  addTip: {
    type: tipType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      videoLink: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const tipModel = new TipModel(params);
      const newTip = await tipModel.save();
      if (!newTip) {
        throw new Error("Error");
      }
      return newTip;
    },
  },
  updateTip: {
    type: tipType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      videoLink: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      return await TipModel.findByIdAndUpdate(
        params.id,
        {
          title: params.title,
          videoLink: params.videoLink,
        },
        function (err) {
          if (err) return next(err);
        }
      );
    },
  },
  deleteTip: {
    type: tipType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const deletedTip = await TipModel.findByIdAndRemove(params.id).exec();
      if (!deletedTip) {
        throw new Error("Error");
      }
      return deletedTip;
    },
  },
};

//
module.exports = { tipQuery: queryType, tipMutation: mutation };
