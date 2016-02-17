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
<<<<<<< HEAD

export function Houses_by_city(city) {
    let cqlText = 'SELECT * FROM houses_by_city where city_id = ? ALLOW FILTERING;';
    let cqlParams = [city];
=======
export function House_list_get_city(city, zipType) {
    console.log(city);
    console.log(zipType);
    let cqlParams;
    let cqlText;
    if (!zipType || zipType==='all') {
        console.log(city);
            console.log('House.js - line: 20');
        cqlText = 'SELECT * FROM "house" where city = ? ALLOW FILTERING;';
        cqlParams = [city];
    } else {
        if (zipType.match(/\d+/g)) {
            cqlText = 'SELECT * FROM "house" where city = ? and zip = ? ALLOW FILTERING;';

            cqlParams = [city, zipType];
            console.log(cqlParams);
        } else {
            cqlText = 'SELECT * FROM "house" where city = ? and type = ? ALLOW FILTERING;';
            cqlParams = [city, zipType];

        }
    }
>>>>>>> origin/master

    return runQuery(House, cqlText, cqlParams);
}

<<<<<<< HEAD
=======
export function House_get(id) {
    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];
>>>>>>> origin/master

export function Houses_by_city_zip(city,zip) {
    let cqlText = 'SELECT * FROM houses_by_city_zip where city_id = ? AND zip_id = ? ALLOW FILTERING;';
    let cqlParams = [city,zip];

    return runQuery(House, cqlText, cqlParams);
}
