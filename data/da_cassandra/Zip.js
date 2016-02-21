import {runQuery, runQueryNoResult, runQueryOneResult, Uuid} from './_client.js';

import Zip from '../model/Zip'

export function Zip_get(id) {
    console.log(id);

    const cqlText = 'SELECT id,code FROM zip WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(Zip, cqlText, cqlParams);
}

export function Zip_by_house(zip_id) {
    let cqlText = 'SELECT * FROM zip WHERE id = ? ';
    let cqlParams = [zip_id];

    return runQueryOneResult(Zip, cqlText, cqlParams);
}

export function Zips_with_args(args) {
    let cqlText;
    let cqlParams = [];

    if (!args.city) {
        cqlText = 'SELECT * FROM zip';

    }
    if (args.city) {
        cqlText = 'SELECT * FROM zips_by_city where city_id = ?;';
        cqlParams.push(args.city);
    }

    return runQuery(Zip, cqlText, cqlParams);
}






