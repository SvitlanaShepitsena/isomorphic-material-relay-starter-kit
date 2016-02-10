import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLObjectType} from "graphql";
import {connectionArgs, connectionFromArray} from "graphql-relay";

import {House_list_get} from '../../data/da/House';
import {City_list_get} from '../../data/da/City';
import NodeInterface from "../interface/NodeInterface";
import HousesConnection from './HousesConnection';
import CitiesConnection from './CitiesConnection';
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
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => House_list_get(user_id).then((arr_House) => connectionFromArray(arr_House, args))
        },

        // <-<-<- Houses
        // <-<-<- Cities

        Cities: {
            type: CitiesConnection.connectionType,
            args: {...connectionArgs},
            resolve: (obj, {...args}, {rootValue: {user_id}}) => City_list_get(user_id).then((arr_City) => connectionFromArray(arr_City, args))
        },

        // <-<-<- Houses
    },
});
