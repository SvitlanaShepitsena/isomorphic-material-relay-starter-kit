import {globalIdField, connectionArgs,} from "graphql-relay";
import {GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";

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
        name: {
            type: GraphQLString,
            resolve: (obj) => obj.name
        },

        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}) => Houses_by_city(obj.id).then((arr_House) => connectionFromArray(arr_House, args))
        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }

            },
            resolve: (obj, {...args}) => Houses_by_city(obj.id).then((arr_House) => arr_House.length)
        },
    }),
});
