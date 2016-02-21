import {runQuery, runQueryOneResult} from './_client.js';

import City from '../model/City'

export function City_get(city) {
    let cqlText = 'select * from city where id = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function City_by_house(city_id) {
    let cqlText = 'SELECT * FROM city WHERE id = ? ';
    let cqlParams = [city_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function City_by_zip(zip_id) {
    let cqlText = 'SELECT * FROM city WHERE id = ? ';
    let cqlParams = [zip_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function Cities_with_args(args) {
    console.log('City.js - line: 27');
    console.log(args);
    let cqlText;
    let cqlParams = [];

    cqlText = 'SELECT * FROM city';

    return runQuery(City, cqlText, cqlParams);
}


