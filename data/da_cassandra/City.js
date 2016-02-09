import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import City from '../model/City'


export function City_list_get( )
{
  let cqlText = 'SELECT * FROM "cities"';
  let cqlParams = [];

  return runQuery( City, cqlText, cqlParams );
}
export function City_get( id )
{
  const cqlText = 'SELECT * FROM "cities" WHERE id = ? ALLOW FILTERING;';
  const cqlParams = [ id ];

  return runQueryOneResult( City, cqlText, cqlParams );
}