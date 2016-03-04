import {runQuery, runQueryOneResult, runCountQuery} from './_elastic.js';

import _ from 'lodash';
import House from '../model/House';

export function House_get(id) {
    console.log('id is :' + id);

    const cqlText = 'SELECT * FROM "house" WHERE id = ? ALLOW FILTERING;';
    const cqlParams = [id];

    return runQueryOneResult(House, cqlText, cqlParams);
}

export function Houses_with_args_count(args) {
    var body = {
        query: {
            match: {
                _all: args.query
            }
        },

    };

    if (args.query) {

        return runCountQuery('sale', body);
    }
}

export function Houses_with_args(args, getResults) {
    let cqlText;
    let cqlParams = [];

    // query to elastic search
    var body = {};
    /* Pagination functionality */
    if (args.page && args.page > 1) {
        body.from = Number(args.page - 1) * 10;
        body.size = 10;
    }
    /* Search case look over all fields*/
    if (args.query) {
        body.query =
        {
            match: {
                _all: args.query
            }
        }

    }
    if (args.city && (!args.zip || args.zip == 'all') && !args.type) {
        body.query =
        {
            filtered: {
                query:{
                    match_all:{}
                },
                filter: {
                    term: {city_id: args.city}
                }
            }
        }
    }

    if (!(args.city && args.zip && args.type)) {
        cqlText = 'SELECT * FROM "house"';
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
            } else {
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

    return runQuery(House, 'sale', body, getResults);
}


