import {runQuery, runQueryNoResult, runQueryOneResult, Uuid} from './_client.js';

import City from '../model/City'

export function Cities_all() {
    let cqlText = 'SELECT * FROM "city"';
    let cqlParams = [];

    return runQuery(City, cqlText, cqlParams);
}

export function City_by_house(city_id) {
    let cqlText = 'SELECT * FROM city WHERE id = ? ';
    let cqlParams = [city_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function City_by_zip(zip_id) {
    let cqlText = 'select city_id from zips_by_city where zip_id = ? ALLOW FILTERING;';
    let cqlParams = [zip_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}
export function City_get(city) {
    let cqlText = 'select * from city where id = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQueryOneResult(City, cqlText, cqlParams);
}



