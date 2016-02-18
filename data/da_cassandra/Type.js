import {runQuery, runQueryNoResult, Uuid} from './_client.js';

import Type from '../model/Type'

export function Types_all() {
    let cqlText = 'SELECT * FROM type';
    let cqlParams = [];

    return runQuery(Type, cqlText, cqlParams);
}
export function Types_by_city(city) {
    let cqlText = 'SELECT id,type FROM types_by_city where city_id = ?';
    let cqlParams = [city];

    return runQuery(Type, cqlText, cqlParams);
}

export function Type_by_house(type_id) {
    let cqlText = 'SELECT * FROM type WHERE id = ? ';
    let cqlParams = [type_id];

    return runQuery(Type, cqlText, cqlParams);
}




