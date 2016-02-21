import {globalIdField, connectionArgs,connectionFromArray} from "graphql-relay";
import {GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import City from '../../data/model/City';
import ZipType from '../../data/model/Zip';

import {Houses_with_args} from '../../data/da_cassandra/House';
import HousesConnection from './HouseConnection';

import {Zips_with_args,Zip_get} from '../../data/da_cassandra/Zip';
import ZipConnection from './ZipConnection';

import {Types_with_args} from '../../data/da_cassandra/Type';
import TypeConnection from './TypeConnection';

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
                type: {
                    type: GraphQLString
                },
            },
            resolve: (obj, {...args}) => Houses_with_args(...args,{city:obj.id}).then((arr) => connectionFromArray(arr, args))
        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                type: {
                    type: GraphQLString
                },
            },
            resolve: (obj, {...args}) => Houses_with_args(...args,{city:obj.id}).then((arr) => arr.length)
        },

        Zips: {
            type: ZipConnection.connectionType,
            args: {
                ...connectionArgs,

            },
            resolve: (obj, {...args}) => Zips_with_args({city:obj.id}).then((arr) => connectionFromArray(arr, args))
        },
        Zips_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
            },
            resolve: (obj, {...args}) => Zips_with_args({city:obj.id}).then((arr) => arr.length)
        },
        Types: {
            type: TypeConnection.connectionType,
            args: {
                ...connectionArgs,
            },
            resolve: (obj, {...args}) => Types_with_args({city:obj.id}).then((arr) => connectionFromArray(arr, args))
        },
        Types_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
            },
            resolve: (obj, {...args}) => Types_with_args({city:obj.id}).then((arr) => arr.length)
        },
    }),
});
