import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';

export default new GraphQLObjectType( {
  name: 'House',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof House,
  fields: {
    id: globalIdField('House'),
    street: { type: GraphQLString, resolve: (obj) => obj.street},
    price: { type: GraphQLString, resolve: (obj) => obj.price},
  },
} );
