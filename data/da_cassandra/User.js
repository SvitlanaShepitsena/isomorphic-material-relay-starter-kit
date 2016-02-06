import { sql, runQueryOneResult } from './_client.js';
import User from '../model/User'
import { Uuid } from '../../data/da_cassandra/_client.js';

const User_0 = new User( { id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ), username: '', password: '', User_DisplayName: 'Anonymous', "User_ProfilePhoto": '', User_Email: '', User_Locale: '' } );

export function DA_User_getByUserName( username )
{
  const query = sql.select( )
    .from( '"User"' )
    .where( 'username=?', username )
    .toParam( )
  ;

  return runQueryOneResult( User, query.text, query.values );
}

export function DA_User_get( id )
{
  // Anonymous user is not even recorded in the database
  if( id === '00000000-0000-0000-0000-000000000000' )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
  else
  {
    const query = sql.select( )
      .from( '"User"' )
      .where( 'id=?', id )
      .toParam( )
    ;
    return runQueryOneResult( User, query.text, query.values );
  }
}
