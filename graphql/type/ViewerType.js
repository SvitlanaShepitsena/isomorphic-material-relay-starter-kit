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

        // ->->-> User properties

        User_IsAnonymous: {type: GraphQLBoolean, resolve: (obj) => obj.id.equals(Uuid_0)},
        User_DisplayName: {type: GraphQLString, resolve: (obj) => obj.User_DisplayName},
        User_ProfilePhoto: {type: GraphQLString, resolve: (obj) => obj.User_ProfilePhoto},
        User_Email: {type: GraphQLString, resolve: (obj) => obj.User_Email},
        User_Locale: {type: GraphQLString, resolve: (obj) => obj.User_Locale},

        // <-<-<- User properties

        // <-<-<- Houses

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
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Houses_all(args.city, args.zipType).then((arr_House) => connectionFromArray(arr_House, args))
        },

        House: {
            type: HouseType,
            args: {...{id: {type: GraphQLString}}},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => House_get(args.id)
        },

        // <-<-<- Houses
        // <-<-<- Cities

        Cities: {
            type: CitiesConnection.connectionType,
            args: {...connectionArgs},
<<<<<<< HEAD
            resolve: (obj, {...args}, {rootValue: {user_id}}) => Cities_all(user_id).then((arr_City) => connectionFromArray(arr_City, args))
=======
            resolve: (obj, {...args}, {rootValue: {user_id}}) => City_list_get(user_id).then((arr_City) => connectionFromArray(arr_City, args))
        },
        CityZips: {
            type: CityZipConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args, {rootValue: {user_id,city}}) => {

                return City_zip_list_get(user_id,args.city).then((arr_CityZips) => connectionFromArray(arr_CityZips, args))
            }
        },
        CityTypes: {
            type: CityTypeConnection.connectionType,
            args: {
                ...connectionArgs,
                city: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args, {rootValue: {user_id,city}}) => {

                return City_type_list_get(user_id,args.city).then((arr_CityTypes) => connectionFromArray(arr_CityTypes, args))
            }
>>>>>>> origin/master
        },

        // <-<-<- Houses
    },
});
