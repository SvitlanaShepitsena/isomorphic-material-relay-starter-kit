import {globalIdField, connectionArgs, connectionFromArray} from "graphql-relay";
import {GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID} from "graphql";

import NodeInterface from "../interface/NodeInterface";
import {Houses_by_city_type, Houses_by_city_zip_type} from '../../data/da_cassandra/House';
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
            resolve: (obj, {...args}) => {
                if (args.zipType) {

                    return Houses_by_city_zip_type(args.city, args.zipType, obj.id).then((arr_House) => connectionFromArray(arr_House, args));
                } else{
                    return Houses_by_city_type(args.city, obj.id).then((arr_House) => connectionFromArray(arr_House, args));
                }

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
            resolve: (obj, {...args}) => {
                if (args.zipType) {

                    return Houses_by_city_zip_type(args.city, args.zipType, obj.id).then((arr_House) => arr_House.length);
                } else{
                    return Houses_by_city_type(args.city, obj.id).then((arr_House) => arr_House.length);
                }

            }

        },

    })
});
