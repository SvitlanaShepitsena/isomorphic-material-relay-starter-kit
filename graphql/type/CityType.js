import {globalIdField, connectionArgs,connectionFromArray} from "graphql-relay";
import {GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import City from '../../data/model/City';
import ZipType from '../../data/model/Zip';

import {Houses_by_city} from '../../data/da_cassandra/House';
import HousesConnection from './HouseConnection';

import {Zips_by_city,Zip_get} from '../../data/da_cassandra/Zip';
import ZipConnection from './ZipConnection';

import {Types_by_city} from '../../data/da_cassandra/Type';
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
        
        Zips: {
            type: ZipConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}) => Zips_by_city(obj.id).then((arr_Zip) => connectionFromArray(arr_Zip, args))
        },
        Zips_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }

            },
            resolve: (obj, {...args}) => Zips_by_city(obj.id).then((arr_Zip) => arr_Zip.length)
        },
        Types: {
            type: TypeConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}) => Types_by_city(obj.id).then((arr_Type) => connectionFromArray(arr_Type, args))
        },
        Types_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }

            },
            resolve: (obj, {...args}) => Types_by_city(obj.id).then((arr_Type) => arr_Type.length)
        },
    }),
});
