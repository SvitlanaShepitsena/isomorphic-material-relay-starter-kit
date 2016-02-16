import {runQuery, runQueryNoResult, Uuid} from './_client.js';

import City from '../model/City'

export function Cities_all() {
    let cqlText = 'SELECT * FROM "city"';
    let cqlParams = [];

    return runQuery(City, cqlText, cqlParams);
}

export function City_by_house(house_id) {
    let cqlText = 'SELECT city FROM house WHERE ';
    let cqlParams = [];

    return runQuery(City, cqlText, cqlParams);
}




