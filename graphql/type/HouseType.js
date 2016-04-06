import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';

import {Type_get} from '../../data/da_cassandra/Type';

export default new GraphQLObjectType({
    name: 'House',
    interfaces: [NodeInterface],
    isTypeOf: obj => obj instanceof House,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (obj) => obj.id
        },
        baths: {type: GraphQLString, resolve: (obj) =>obj.baths},
        beds: {type: GraphQLString, resolve: (obj) =>obj.beds},
        built: {type: GraphQLString, resolve: (obj) =>obj.built},
        city: {type: GraphQLString, resolve: (obj) => (obj.city_id)},
        description: {type: GraphQLString, resolve: (obj) =>obj.description},
        details: {type: GraphQLString, resolve: (obj) =>obj.details},
        image: {type: GraphQLString, resolve: (obj) =>obj.image},
        mls: {type: GraphQLString, resolve: (obj) =>obj.mls},
        price: {type: GraphQLString, resolve: (obj) =>obj.price},
        since: {type: GraphQLString, resolve: (obj) =>obj.since},
        street: {type: GraphQLString, resolve: (obj) =>obj.street},
<<<<<<< HEAD
        details: {type: GraphQLString, resolve: (obj) =>obj.details}
=======
        type: {type: GraphQLString, resolve: (obj) =>(obj.type_id)},
        zip: {type: GraphQLString, resolve: (obj) =>(obj.zip_id)},
>>>>>>> work-local

    }),
});
