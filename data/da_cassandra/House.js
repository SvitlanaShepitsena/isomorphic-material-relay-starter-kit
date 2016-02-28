import {runQuery, runQueryOneResult, runQueryNoResult, Uuid} from './_client.js';

import _ from 'lodash';
import House from '../model/House';

export function House_get(id) {
    console.log('id is :' + id);

    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}

export function Houses_with_args(args) {
    let cqlText;
    let cqlParams = [];


    if (args.search) {
        cqlText = 'SELECT * FROM house';
    }
    

    if (!(args.city && args.zip && args.type)) {
        cqlText = 'SELECT * FROM "house"';
    }

    if (args.city && (!args.zip || args.zip == 'all') && !args.type) {
        cqlText = 'SELECT * FROM houses_by_city where city_id = ?;';
        cqlParams.push(args.city);
    }

    if (args.zip && !args.type) {
        cqlText = 'SELECT * FROM houses_by_zip where zip_id = ?;';
        cqlParams = [args.zip];
    }

    if (args.city && args.zip && !args.type) {
        if (args.zip !== 'all') {
            if (!args.zip.match(/^\d+$/)) {

                cqlText = 'SELECT * FROM houses_by_city_type where city_id = ? AND type_id = ?;';
                cqlParams = [args.city, args.zip];
            } else{
            cqlText = 'SELECT * FROM houses_by_zip where zip_id = ?;';
            cqlParams = [args.zip];

            }
        } else {
            cqlText = 'SELECT * FROM houses_by_city where city_id = ?;';
            cqlParams = [args.city];

        }
    }

    if (args.zip && args.type) {

        cqlText = 'SELECT * FROM houses_by_zip_type where zip_id = ? AND type_id = ?;';
        cqlParams = [args.zip, args.type];
    }

    if (args.city && args.type && !args.zip) {

        cqlText = 'SELECT * FROM houses_by_city_type where city_id = ? AND type_id = ?;';
        cqlParams = [args.city, args.type];
    }

    return runQuery(House, cqlText, cqlParams);
}


