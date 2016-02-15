import {runQuery, runQueryOneResult, runQueryNoResult, Uuid} from './_client.js';

import House from '../model/House'

export function House_list_get() {
    let cqlText = 'SELECT * FROM "house"';
    let cqlParams = [];

    return runQuery(House, cqlText, cqlParams);
}
export function House_list_get_city(city, zipType) {
    console.log(city);
    console.log(zipType);
    let cqlParams;
    let cqlText;
    if (!zipType) {
        cqlText = 'SELECT * FROM "house" where city = ? ALLOW FILTERING;';
        cqlParams = [city];
    } else {
        if (zipType.match(/\d+/g)) {
            console.log('House.js - line: 20');
            cqlText = 'SELECT * FROM "house" where city = ? and zip = ? ALLOW FILTERING;';

            cqlParams = [city, zipType];
            console.log(cqlParams);
        } else {
            cqlText = 'SELECT * FROM "house" where city = ? and type = ? ALLOW FILTERING;';
            cqlParams = [city, zipType];

        }
    }

    return runQuery(House, cqlText, cqlParams);
}

export function House_get(id) {
    console.log(id);
    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}