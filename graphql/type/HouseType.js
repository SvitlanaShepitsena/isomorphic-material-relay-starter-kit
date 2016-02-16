import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLNonNull,GraphQLID, GraphQLString, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';

import CityType from './CityType';
import {City_by_house} from '../../data/da_cassandra/City';

import ZipType from './ZipType';
import {Zip_by_house} from '../../data/da_cassandra/Zip';

export default new GraphQLObjectType({
    name: 'House',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof House,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        city: {type: CityType, resolve: (obj) => City_by_house(obj.id)},
        zip: {type: ZipType, resolve: (obj) =>Zip_by_house(obj.id)},
        price: {type: GraphQLString, resolve: (obj) =>obj.price}


    }),
});
