import {globalIdField, connectionArgs, connectionFromArray} from "graphql-relay";
import {GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Zip from '../../data/model/Zip';

import CityType from './CityType';
import {City_by_zip} from '../../data/da_cassandra/City';

import {Houses_with_args} from '../../data/da_cassandra/House';
import {Types_with_args} from '../../data/da_cassandra/Type';

import HousesConnection from './HouseConnection';
import TypesConnection from './TypeConnection';

export default new GraphQLObjectType({
    name: 'Zip',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof Zip,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        code: {
            type: GraphQLString,
            resolve: (obj) => obj.code
        },
        city: {
            type: CityType,
            resolve: (obj) => City_by_zip(obj.id)
        },
        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                type: {
                    type: GraphQLString
                },

            },
            resolve: (obj, {...args}) => Houses_with_args(...args,{zip:obj.id}).then((arr) => connectionFromArray(arr, args))
        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                type: {
                    type: GraphQLString
                },
            },
            resolve: (obj, {...args}) => Houses_with_args(...args,{zip:obj.id}).then((arr) => arr.length)
        },
        Types: {
            type: TypesConnection.connectionType,
            args: {
                ...connectionArgs,
            },
            resolve: (obj, {...args}) => Types_with_args({zip:obj.id}).then((arr) => connectionFromArray(arr, args))
        },

    }),
});
