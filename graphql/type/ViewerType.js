import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString, GraphQLObjectType} from "graphql";
import {connectionArgs, connectionFromArray} from "graphql-relay";

import {Houses_by_city_zip,Houses_by_city, Houses_all, House_get} from '../../data/da/House';

import {Cities_all} from '../../data/da/City';

import NodeInterface from "../interface/NodeInterface";

import HousesConnection from './HouseConnection';
import CitiesConnection from './CityConnection';


import HouseType from './HouseType';

import User from '../../data/model/User';
import {Uuid} from '../../data/da_cassandra/_client.js';

const Uuid_0 = Uuid.fromString('00000000-0000-0000-0000-000000000000');

export default new GraphQLObjectType({
    name: 'Viewer',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof User,
    fields: {
        id: globalIdField('Viewer'),

        User_IsAnonymous: {type: GraphQLBoolean, resolve: (obj) => obj.id.equals(Uuid_0)},
        User_DisplayName: {type: GraphQLString, resolve: (obj) => obj.User_DisplayName},
        User_ProfilePhoto: {type: GraphQLString, resolve: (obj) => obj.User_ProfilePhoto},
        User_Email: {type: GraphQLString, resolve: (obj) => obj.User_Email},
        User_Locale: {type: GraphQLString, resolve: (obj) => obj.User_Locale},

        Houses: {
            type: HousesConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                },
                zipType: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Houses_all().then((arr_House) => connectionFromArray(arr_House, args))
        },
        Houses_Count: {
            type: GraphQLInt,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                },
                zipType: {
                    type: GraphQLString
                }
            },
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Houses_all().then((arr_House) => arr_House.length)
        },
        House: {
            type: HouseType,
            args: {...{id: {type: GraphQLString}}},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => House_get(args.id)
        },
        Cities: {
            type: CitiesConnection.connectionType,
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Cities_all(user_id).then((arr_City) => connectionFromArray(arr_City, args))
        },

        Cities_Count: {
            type: GraphQLInt,
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Cities_all(user_id).then((arr_City) => arr_City.length)
        },
    },
});
