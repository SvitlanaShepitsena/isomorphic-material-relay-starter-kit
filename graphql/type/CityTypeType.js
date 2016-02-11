import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import CityType from '../../data/model/CityType';

export default new GraphQLObjectType( {
  name: 'CityType',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof CityType,
  fields: {
    id: globalIdField('CityType'),
    city: { type: GraphQLString, resolve: (obj) => obj.city},
    type: { type: GraphQLString, resolve: (obj) => obj.type},
    number: { type: GraphQLString, resolve: (obj) => obj.number}
  },
} );
