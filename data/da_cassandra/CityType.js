import {runQuery, runQueryNoResult, Uuid} from './_client.js';

import CityType from '../model/CityType'

export function City_type_list_get(user_id, city) {
    city = city.replace(/-+/g, ' ');
    let cqlText = 'SELECT * FROM city_type WHERE city = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQuery(CityType, cqlText, cqlParams);
}




