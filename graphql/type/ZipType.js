import {globalIdField, connectionArgs,connectionFromArray} from "graphql-relay";
import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull,GraphQLID} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import Zip from '../../data/model/Zip';

import CityType from './CityType';
import {City_by_zip} from '../../data/da_cassandra/City';

import {Houses_by_zip} from '../../data/da_cassandra/House';
import HousesConnection from './HouseConnection';


export default new GraphQLObjectType( {
  name: 'Zip',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Zip,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj.id
    },
    code: {
      type: GraphQLString,
      resolve: (obj) => obj.code
    },
    city: {
      type: CityType,
      resolve: (obj) => City_by_zip(obj.city_id)
    },
    Houses: {
      type: HousesConnection.connectionType,
      args: {
        ...connectionArgs,
        city: {
          type: GraphQLString
        }
      },
      resolve: (obj, {...args}) => Houses_by_zip(obj.id).then((arr_House) => connectionFromArray(arr_House, args))
    },
    Houses_Count: {
      type: GraphQLInt,
      args: {
        ...connectionArgs,
        city: {
          type: GraphQLString
        }

      },
      resolve: (obj, {...args}) => Houses_by_zip(obj.id).then((arr_House) => arr_House.length)
    },


  }),
} );
