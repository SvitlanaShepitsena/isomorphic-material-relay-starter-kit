import {runQuery, runQueryOneResult} from './_client.js';

import Type from '../model/Type'

export function Types_with_args(args) {
    let cqlText;
    let cqlParams = [];

    if (!(args.city && args.zip)) {
        cqlText = 'SELECT * FROM type';
    }

    if (args.city) {
        cqlText = 'SELECT * FROM types_by_city where city_id = ?;';
        cqlParams.push(args.city);
    }
    if ( args.zip) {
        cqlText = 'SELECT * FROM types_by_zip where zip_id = ?;';
        cqlParams = [args.zip];
    }

    return runQuery(Type, cqlText, cqlParams);
}

export function Type_get(type_id) {
    let cqlText = 'SELECT * FROM type WHERE id = ? ';
    let cqlParams = [type_id];

    return runQueryOneResult(Type, cqlText, cqlParams);
}


