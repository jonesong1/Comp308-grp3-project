var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var NurseModel = require("../models/nurse.server.model");
const ObjectId = require("mongodb").ObjectID;

// Create a GraphQL Object Type for Course model
const nurseType = new GraphQLObjectType({
    name: "nurse",
    fields: function () {
        return {
            _id: {
                type: GraphQLString,
            },
            firstName: {
                type: GraphQLString,
            },
            lastName: {
                type: GraphQLString,
            },
            username: {
                type: GraphQLString,
            },
            password: {
                type: GraphQLString,
            },
        };
    },
});


// create a GraphQL query type that returns all nurses
const queryType = {
    nurses: {
        type: new GraphQLList(nurseType),
        resolve: async () => {
            const nurses = await NurseModel.find().exec();
            if (!nurses) {
                throw new Error("Error");
            }
            return nurses;
        },
    },
    nurse: {
        type: nurseType,
        args: {
            id: {
                name: "_id",
                type: GraphQLString,
            },
        },
        resolve: async (root, params) => {
            const nurseInfo = await NurseModel.findById(params.id).exec();
            if (!nurseInfo) {
                throw new Error("Error");
            }
            return nurseInfo;
        },
    },
};
// create a GraphQL query type that return CRUD oeprations
const mutation = {
    addNurse: {
        type: nurseType,
        args: {
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            username: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async (root, params) => {
            const nurseModel = new NurseModel(params);
            const newNurse = await nurseModel.save();
            if (!newNurse) {
                throw new Error("Error");
            }
            return newNurse;
        },
    },
    updateNurse: {
        type: nurseType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            username: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            }
        }
    },
    resolve: async (root, params) => {
        const hashed = await bcrypt.hash(params.password, saltRounds);
        return await NurseModel.findByIdAndUpdate(
            params.id,
            {
                firstName: params.firstName,
                lastName: params.lastName,
                username: params.username,
                password: hashed,
            },
            function (err) {
                if (err) return next(err);
            }
        );
    },

    deleteNurse: {
        type: nurseType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: async (root, params) => {
        const deletedNurse = await NurseModel.findByIdAndRemove(
            params.id
        ).exec();
if (!deletedNurse) {
    throw new Error("Error");
}
return deletedNurse;
      },
    },
  };

//
module.exports = { nurseQuery: queryType, nurseMutation: mutation };

