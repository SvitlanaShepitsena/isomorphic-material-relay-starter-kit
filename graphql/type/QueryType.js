import { fromGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

import ViewerType from "./ViewerType";
import NodeInterface from "../interface/NodeInterface";

import { DA_User_get } from '../../data/da/User';
import { DA_Compendium_get } from '../../data/da/Compendium';
import { DA_ToDo_get } from '../../data/da/ToDo';

function resolveNodeField( source, args )
{
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const {id, type} = fromGlobalId(args.id);

  // map the local type and id into the
  // actual data for the record
  switch( type )
  {
    case "Viewer":     return DA_User_get( id );

    case "Compendium": return DA_Compendium_get( id );
    case "ToDo":       return DA_ToDo_get( id );
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
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    }
  })
});
