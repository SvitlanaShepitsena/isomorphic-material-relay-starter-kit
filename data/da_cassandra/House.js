import {runQuery, runQueryOneResult, runQueryNoResult, Uuid} from './_client.js';

import House from '../model/House';

export function House_get(id) {
    console.log(id);
    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}

export function Houses_all() {
    let cqlText = 'SELECT * FROM "house"';
    let cqlParams = [];

    return runQuery(House, cqlText, cqlParams);
}

export function Houses_by_city(city) {
    let cqlText = 'SELECT * FROM houses_by_city where city_id = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQuery(House, cqlText, cqlParams);
}
export function Houses_by_zip(zip) {
    let cqlText = 'SELECT * FROM houses_by_zip where zip_id = ? ALLOW FILTERING;';
    let cqlParams = [zip];

    return runQuery(House, cqlText, cqlParams);
}


export function Houses_by_city_zip(city,zip) {
    let cqlText = 'SELECT * FROM houses_by_city_zip where city_id = ? AND zip_id = ? ALLOW FILTERING;';
    let cqlParams = [city,zip];

    return runQuery(House, cqlText, cqlParams);
}
