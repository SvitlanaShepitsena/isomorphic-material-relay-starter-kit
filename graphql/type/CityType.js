import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLNonNull,GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import City from '../../data/model/City';

import HouseType from './HouseType';
import {Houses_by_city} from '../../data/da_cassandra/House';

import ZipType from './ZipType';
import {Zips_by_city} from '../../data/da_cassandra/Zip';

export default new GraphQLObjectType({
    name: 'City',
    interfaces: [NodeInterface],
    isTypeOf: obj => obj instanceof City,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        houses: {
            type: new GraphQLList(HouseType),
            resolve: (obj) =>Houses_by_city(obj.id)
        },

    }),
});
