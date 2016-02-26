import {fromGlobalId} from "graphql-relay";
import {GraphQLID, GraphQLNonNull, GraphQLObjectType} from "graphql";

import ViewerType from "./ViewerType";
import HouseType from "./HouseType";
import NodeInterface from "../interface/NodeInterface";

import {House_get} from '../../data/da/House';
import {DA_User_get} from '../../data/da/User';

function resolveNodeField(source, args) {
    // the node field will receive a globally
    // unique id, and here we convert that back
    // to the local type and id
    const {id, type} = fromGlobalId(args.id);

    // map the local type and id into the
    // actual data for the record
    switch (type) {
        case "Viewer":
            return DA_User_get(id);
        break;
        case "House":
            return House_get(id);
        break;

    }
};

export default new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        node: {
            type: NodeInterface,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: resolveNodeField
        },
        Viewer: {
            type: ViewerType,
            resolve: (parent, args, {rootValue: {user_id}}) => DA_User_get(user_id)
        },
        House: {
            type: HouseType,
            resolve: (parent, args, {rootValue: {house_id}}) => House_get(house_id)
        }
    })
});
