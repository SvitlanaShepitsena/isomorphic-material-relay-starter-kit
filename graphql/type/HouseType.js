import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLString, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';


export default new GraphQLObjectType({
    name: 'House',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof House,
    fields: {
        id: globalIdField('House'),
        mls: {type: GraphQLString, resolve: (obj) => obj.mls},
        city: {type: GraphQLString, resolve: (obj) => obj.city},
        state: {type: GraphQLString, resolve: (obj) => obj.state},
        street: {type: GraphQLString, resolve: (obj) => obj.street},
        zip: {type: GraphQLString, resolve: (obj) => obj.zip},
        price: {type: GraphQLString, resolve: (obj) => obj.price},
        beds: {type: GraphQLString, resolve: (obj) => obj.beds},
        description: {type: GraphQLString, resolve: (obj) => obj.description},
        image: {type: GraphQLString, resolve: (obj) => obj.image},
        type: {type: GraphQLString, resolve: (obj) => obj.type}
    },
});
