import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Zip from '../../data/model/Zip';

export default new GraphQLObjectType( {
  name: 'Zip',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Zip,
  fields: {
    id: globalIdField('Zip')
  },
} );
