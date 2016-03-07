import User from '../model/User'

const User_0 = new User( { id: '00000000-0000-0000-0000-000000000000' , username: '', password: '', User_DisplayName: 'Anonymous', "User_ProfilePhoto": '', User_Email: '', User_Locale: '' } );
export function DA_User_get( id )
{
  // Anonymous user is not even recorded in the database
  if( id === '00000000-0000-0000-0000-000000000000' )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
}
