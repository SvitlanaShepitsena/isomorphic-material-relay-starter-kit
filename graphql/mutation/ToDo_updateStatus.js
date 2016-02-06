import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_get, DA_ToDo_update } from '../../data/da/ToDo';

import ToDoType from '../type/ToDoType';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_updateStatus',
  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {localToDoId} ) => DA_ToDo_get( localToDoId ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { id, ToDo_Complete } ) => {
    var localToDoId = fromGlobalId(id).id;
    return DA_ToDo_update( localToDoId, { ToDo_Complete: ToDo_Complete } )
    .then( ( ) => ( {localToDoId} ) )
    ;
  },
} );
