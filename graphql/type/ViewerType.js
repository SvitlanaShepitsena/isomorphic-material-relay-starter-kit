import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString, GraphQLObjectType,GraphQLList} from "graphql";
import {connectionArgs, connectionFromArray} from "graphql-relay";
import _ from 'lodash';

import {Houses_with_args,Houses_with_args_count, House_get} from '../../data/da/House';
import {Types_with_args} from '../../data/da/Type';
import {Cities_with_args, City_get} from '../../data/da/City';

import NodeInterface from "../interface/NodeInterface";

import HousesConnection from './HouseConnection';
import TypeConnection from './TypeConnection';
import CitiesConnection from './CityConnection';

import HouseType from './HouseType';
import CityType from './CityType';

import User from '../../data/model/User';


export default new GraphQLObjectType({
    name: 'Viewer',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof User,
    fields: {
        id: globalIdField('Viewer'),

        // ->->-> User properties



        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                },
                zip: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                },
                query: {
                    type: GraphQLString
                },
                page:{
                    type:GraphQLInt
                }

            },
            resolve: (obj, {...args}) => {
                return Houses_with_args(args).then((arr) => {

                    return connectionFromArray(arr, args)});
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
                },
                type: {
                    type: GraphQLString
                },
                query: {
                    type: GraphQLString
                },
                page:{
                    type:GraphQLInt
                }

            },
            resolve: (obj, {...args}) => {
                return Houses_with_args_count(args);
            }
        },

        House: {
            type: HouseType,
            args: {...{id: {type: GraphQLString}}},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => House_get(args.id)
        },
        City: {
            type: CityType,
            args: {...{city: {type: GraphQLString}}},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => City_get(args.city)
        },
        Cities: {
            type: CitiesConnection.connectionType,
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Cities_with_args(args).then((arr) => connectionFromArray(arr, args))
        },

        Cities_Count: {
            type: GraphQLInt,
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Cities_with_args(args).then((arr) => arr.length)
        },
        Types: {
            type: TypeConnection.connectionType,
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

                return Types_with_args(args).then((arr) => connectionFromArray(arr, args));

            }
        },

        Types_Count: {
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
                return Types_with_args(args).then((arr) => arr.length);

            }
        },

    },
});
