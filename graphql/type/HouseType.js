import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLNonNull,GraphQLID, GraphQLString, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';

import CityType from './CityType';
import TypeType from './TypeType';

import {City_by_house} from '../../data/da_cassandra/City';

import ZipType from './ZipType';
import {Zip_by_house} from '../../data/da_cassandra/Zip';
import {Type_by_house} from '../../data/da_cassandra/Type';

export default new GraphQLObjectType({
    name: 'House',
    interfaces: [NodeInterface],
    isTypeOf: obj => obj instanceof House,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        city: {type: CityType, resolve: (obj) => City_by_house(obj.city_id)},
        zip: {type: ZipType, resolve: (obj) =>Zip_by_house(obj.zip_id)},
        type: {type: TypeType, resolve: (obj) =>Type_by_house(obj.type_id)},
        price: {type: GraphQLString, resolve: (obj) =>obj.price},
        beds: {type: GraphQLString, resolve: (obj) =>obj.beds},
        description: {type: GraphQLString, resolve: (obj) =>obj.description},
        image: {type: GraphQLString, resolve: (obj) =>obj.image},
        mls: {type: GraphQLString, resolve: (obj) =>obj.mls},
        street: {type: GraphQLString, resolve: (obj) =>obj.street}



    }),
});
