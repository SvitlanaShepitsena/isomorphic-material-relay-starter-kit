import {runQuery, runQueryOneResult, runQueryNoResult, Uuid} from './_client.js';

import House from '../model/House'

export function House_list_get() {
    let cqlText = 'SELECT * FROM "house"';
    let cqlParams = [];

    return runQuery(House, cqlText, cqlParams);
}
export function House_list_get_city(city) {
    let cqlText = 'SELECT * FROM "house" where city = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQuery(House, cqlText, cqlParams);
}

export function House_get(id) {
    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}