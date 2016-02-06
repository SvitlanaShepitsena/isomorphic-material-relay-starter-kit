import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_Translaticiarum_delete } from '../../data/da/Translaticiarum';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Translaticiarum_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedTranslaticiarumId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) =>
  {
    var localTranslaticiarumId = fromGlobalId(id).id;
    return DA_Translaticiarum_delete( user_id, localTranslaticiarumId )
    .then( ( ) => ( {id} ) )
    ;
  }
} );
