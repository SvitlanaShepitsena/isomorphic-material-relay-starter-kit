import {runQuery, runQueryNoResult, runQueryOneResult, Uuid} from './_client.js';

import Zip from '../model/Zip'

export function Zip_get(id) {
    console.log(id);
    const cqlText = 'SELECT * FROM zip WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}

export function Zips_all() {
    let cqlText = 'SELECT * FROM zip';
    let cqlParams = [];

    return runQuery(Zip, cqlText, cqlParams);
}
export function Zips_by_city(city) {
    console.log(city);
    let cqlText = 'SELECT * FROM zips_by_city where city_id = ?';
    let cqlParams = [city];

    return runQuery(Zip, cqlText, cqlParams);
}

export function Zip_by_house(zip_id) {
    let cqlText = 'SELECT * FROM zip WHERE id = ? ';
    let cqlParams = [zip_id];

    return runQuery(Zip, cqlText, cqlParams);
}




