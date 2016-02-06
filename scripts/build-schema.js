import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

import schema from '../graphql/schema';

let file_schema_json = path.join(__dirname, '../graphql/schema.json');
let file_schema_graphql = path.join(__dirname, '../graphql/schema.graphql');

// Save JSON of full schema introspection for Babel Relay Plugin to use
async function createJson( )
{
  var result = await( graphql( schema, introspectionQuery ) );
  if( result.errors )
  {
    console.error( 'ERROR! ' );
    console.error( 'ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2) );
  }
  else
  {
    fs.writeFileSync( file_schema_json, JSON.stringify(result, null, 2) );
    console.log( 'Written: ' + file_schema_json );
  }
};

// Save user readable type system shorthand of schema
fs.writeFileSync( file_schema_graphql, printSchema( schema ) );
console.log( 'Written: ' + file_schema_graphql );

createJson( );
