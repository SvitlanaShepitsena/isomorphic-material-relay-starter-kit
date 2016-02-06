import chalk from 'chalk';
import express from 'express';
import cookieParser from 'cookie-parser';
import graphQLHTTP from 'express-graphql';
import compression from 'compression';
import jwt from 'jwt-simple';
import path from 'path';

import auth from './auth'; // Authentication server
import webapp from '../webapp/server'; // React server
import schema from '../graphql/schema'; // Schema for GraphQL server

// Read environment
require( 'dotenv' ).load( );

console.log( chalk.blue( '----------------------------------------------------------------------------------------------------' ) );
console.log( 'Application ' + chalk.bold.magenta( process.env.npm_package_name ) + ' version ' + chalk.bold.magenta( process.env.npm_package_version ) + ' running in ' + chalk.bold.magenta( process.env.NODE_ENV ) );
console.log( 'Serving at ' + chalk.bold.magenta( process.env.HOST ) + ':' + chalk.bold.magenta( process.env.PORT ) + ', public url: ' + chalk.bold.magenta( process.env.PUBLIC_URL ) );
console.log( 'Cassandra keyspace ' + chalk.bold.magenta( process.env.CASSANDRA_KEYSPACE ) + ', connection points ' + chalk.bold.magenta( JSON.stringify( process.env.CASSANDRA_CONNECTION_POINTS.split( ',' ) ) ) );
console.log( chalk.blue( '----------------------------------------------------------------------------------------------------' ) );

let router = express( );

router.set( 'trust proxy', 'loopback' );
router.set( 'x-powered-by', false );

router.use( compression( ) );
router.use( cookieParser( ) );

// Graphql server
router.use( '/graphql', graphQLHTTP( request => {
  let user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous
  try
  {
    if( request.cookies.auth_token )
      if( request.cookies.auth_token.length > 10 )
      {
        var decoded = jwt.decode( request.cookies.auth_token, process.env.JWT_SECRET );
        user_id = decoded.user_id;
      }
  }
  catch( err )
  {
    console.log( chalk.bold.red( "Failure while decoding JWT token, using anonymous instead." ) );
    console.log( chalk.red( err.message ) );
    console.log( chalk.blue( '.' ) );
  }

  return( {
    schema: schema,
    rootValue: { user_id: user_id },
    pretty: true
  } )
} ) );

// Authentication server
router.use( '/auth', auth );

// Static assets server
let oneYear = 365*86400000;
router.use( express.static( path.resolve( __dirname + '/../public/' ), { maxAge: oneYear } ) );

// Application with routes
router.use( '/*', webapp );

let server = router.listen( process.env.PORT, process.env.HOST );

export default server;
