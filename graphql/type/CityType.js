import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";


import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString, GraphQLObjectType} from "graphql";
import {connectionArgs, connectionFromArray} from "graphql-relay";
import NodeInterface from "../interface/NodeInterface";

import City from '../../data/model/City';

import {Houses_by_city} from '../../data/da_cassandra/House';

import HousesConnection from './HouseConnection';

export default new GraphQLObjectType({
    name: 'City',
    interfaces: [NodeInterface],
    isTypeOf: obj => obj instanceof City,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Houses_by_city(args.city).then((arr_House) => connectionFromArray(arr_House, args))
        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }

            },
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Houses_by_city(args.city).then((arr_House) => arr_House.length)
        },
    }),
});
