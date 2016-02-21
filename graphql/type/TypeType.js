import {globalIdField, connectionArgs, connectionFromArray} from "graphql-relay";
import {GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID} from "graphql";

import NodeInterface from "../interface/NodeInterface";
import {Houses_with_args} from '../../data/da_cassandra/House';
import HousesConnection from './HouseConnection';

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

        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                },
                zip: {
                    type: GraphQLString
                }

            },
            resolve: (obj, args) => {
                return Houses_with_args({...args,type: obj.id}).then((arr) => connectionFromArray(arr, args))
            }

        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                },
                zip: {
                    type: GraphQLString
                }

            },
            resolve: (obj, args) => {
                return Houses_with_args({...args, type: obj.id}).then((arr) => arr.length);
            }
        },

    })
});
