import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_get, DA_ToDo_update } from '../../data/da/ToDo';

import ToDoType from '../type/ToDoType';

export default mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {localToDoId} ) => DA_ToDo_get(localToDoId),
    }
  },
  mutateAndGetPayload: ( {id, ToDo_Text} ) => {
    var localToDoId = fromGlobalId(id).id;
    return DA_ToDo_update( localToDoId, { ToDo_Text: ToDo_Text } )
    .then( ( ) => ( {localToDoId} ) )
    ;
  },
} );
