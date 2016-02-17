import {runQuery, runQueryNoResult, Uuid} from './_client.js';

import City from '../model/City'

export function Zips_all() {
    let cqlText = 'SELECT * FROM zip';
    let cqlParams = [];

    return runQuery(City, cqlText, cqlParams);
}
export function Zips_by_city(city) {
    let cqlText = 'SELECT zip FROM houses_by_city_zip where city_id = ?';
    let cqlParams = [city];

    return runQuery(City, cqlText, cqlParams);
}

export function Zip_by_house(house_id) {
    let cqlText = 'SELECT zip FROM house WHERE id = ? ';
    let cqlParams = [house_id];

    return runQuery(City, cqlText, cqlParams);
}




