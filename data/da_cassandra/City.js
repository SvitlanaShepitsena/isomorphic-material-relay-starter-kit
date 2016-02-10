import { runQuery, runQueryNoResult, Uuid } from './_client.js';

import City from '../model/City'


export function City_list_get( )
{
  let cqlText = 'SELECT * FROM "city"';
  let cqlParams = [];

  return runQuery( City, cqlText, cqlParams );
}




