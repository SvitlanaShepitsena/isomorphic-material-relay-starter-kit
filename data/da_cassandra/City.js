import { sql, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import City from '../model/City'


export function City_list_get( )
{
  let cqlText = 'SELECT * FROM "city"';
  let cqlParams = [];

  return runQuery( City, cqlText, cqlParams );
}

export function City_get_house(houseId)
{

  const query = sql.select('city')
      .from( '"house"' )
      .where( 'id=?', houseId )
      .toParam( )
      ;

  return runQueryOneResult( City, query.text, query.values );
}


