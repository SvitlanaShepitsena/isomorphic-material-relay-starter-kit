import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import { DA_User_getByUserName } from '../data/da/User';

// Read environment
require( 'dotenv' ).load( );


let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/', function(req, res, next)
{
  let username = req.body.username;
  let password = req.body.password;

  DA_User_getByUserName( username )
    .then( ( a_User ) =>
    {
      if ( ! a_User )
        return res.status( 401 ).json( { error: 'Incorrect user' } );
      // Quite naturally this is not how it should be done in production. Never store your passwords in
      // clear text. Use something like bcrypt. Resources:
      //   http://arstechnica.com/security/2012/08/passwords-under-assault/
      //   https://www.npmjs.com/package/bcrypt
      // TODO Create a method in the DS which checks for a_User's password, this would be a better
      // level of abstraction.
      else if( ! ( a_User.password == password ) )
        return res.status( 401 ).json( { error: 'Incorrect password' } );
      else
      {
        // User has authenticated correctly thus we create a JWT token
        var token = jwt.encode( { user_id: a_User.id }, process.env.JWT_SECRET );

        res.cookie( 'auth_token', token, { httpOnly: true } );
        res.json( { success : true } );
      }
    } )
    .catch( next )
  ;
  // TODO provide response in case of exception
  //
  // try
  // {
  //
  // }
  // catch (e)
  // {
  //   return res.status( 401 ).json( { error: 'Error while looking for a_User' } );
  // }
} );


export default auth;
