import {runQuery, runQueryNoResult, Uuid} from './_client.js';

import CityZip from '../model/CityZip'

export function City_zip_list_get(user_id, city) {
    let cqlText = 'SELECT * FROM city_zip WHERE city = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQuery(CityZip, cqlText, cqlParams);
}




