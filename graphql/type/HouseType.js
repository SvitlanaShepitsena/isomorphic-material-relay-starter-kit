import {globalIdField} from "graphql-relay";
import {GraphQLBoolean, GraphQLString, GraphQLObjectType} from "graphql";

import NodeInterface from "../interface/NodeInterface";

import House from '../../data/model/House';
import Zip from '../../data/model/Zip';
import City from '../../data/model/City';


export default new GraphQLObjectType({
    name: 'House',
    interfaces: [NodeInterface],
    isTypeOf: object => object instanceof House,
    fields: {
        id: globalIdField('House'),
        city: {type: City, resolve: (obj) => obj.mls}

    },
});
