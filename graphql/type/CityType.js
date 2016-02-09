import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import City from '../../data/model/City';

export default new GraphQLObjectType( {
  name: 'City',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof City,
  fields: {
    id: globalIdField('City'),
    name: { type: GraphQLString, resolve: (obj) => obj.name}
  },
} );
