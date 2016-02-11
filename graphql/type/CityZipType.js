import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import CityZip from '../../data/model/CityZip';

export default new GraphQLObjectType( {
  name: 'CityZip',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof CityZip,
  fields: {
    id: globalIdField('CityZip'),
    city: { type: GraphQLString, resolve: (obj) => obj.city},
    zip: { type: GraphQLString, resolve: (obj) => obj.zip},
    number: { type: GraphQLString, resolve: (obj) => obj.number}
  },
} );
