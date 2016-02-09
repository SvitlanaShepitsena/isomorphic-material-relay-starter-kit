import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import House from '../model/House'


export function House_list_get( )
{
  let cqlText = 'SELECT * FROM "houses"';
  let cqlParams = [];

  return runQuery( House, cqlText, cqlParams );
}

export function House_list_get_city( )
{
  let cqlText = 'SELECT * FROM "houses" WHERE city = ? ALLOW FILTERING;';
  let cqlParams = [];

  return runQuery( House, cqlText, cqlParams );
}


export function House_get( id )
{
  const cqlText = 'SELECT * FROM "houses" WHERE id = ? ALLOW FILTERING;';
  const cqlParams = [ id ];

  return runQueryOneResult( House, cqlText, cqlParams );
}