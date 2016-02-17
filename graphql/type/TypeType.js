import {globalIdField, connectionArgs,connectionFromArray} from "graphql-relay";
import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull,GraphQLID} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Type from '../../data/model/Type';

export default new GraphQLObjectType({
    name: 'Type',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof Type,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        type: {
            type: GraphQLString,
            resolve: (obj) => obj.type
        },
    })
});
