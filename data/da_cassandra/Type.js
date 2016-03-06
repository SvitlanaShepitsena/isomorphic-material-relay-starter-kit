import {runQuery, runQueryNoResult, runQueryOneResult, Uuid} from './_elastic';

import Type from '../model/Type'
import _ from 'lodash';

export function Types_with_args(args) {

    var body;

    if (!(args.city && args.zip)) {
        body = {

            fields: ['type_id'],
            aggregations: {
                types: {
                    terms: {
                        field: 'type_id'
                    }
                }
            }

        };

        return runQuery(Type, 'sale', body, (res)=> {
                var Aggs = res.aggregations.types;

                return Aggs.buckets.map(item=> {
                    let objType = {
                        id: item.key,
                        type: item.key,
                        count: item.doc_count
                    }
                    console.log(objType);
                    return objType;
                });
            }
        );
    }

    if (args.city && !args.zip) {
        body = {
            "query": {
                "match": {
                    "city_id": args.city
                }
            },
            "aggs": {

                "types": {
                    "terms": {
                        "field": "type_id"

                    }
                }
            }
        }
        return runQuery(Type, 'sale', body, (res)=> {
                var Aggs = res.aggregations.types;

                return _.compact(Aggs.buckets.map(item=> {
                    console.log(item);
                    let objType = {
                        id: item.key,
                        type: item.key,
                        count: item.doc_count
                    }
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log(objType.count);

                    return objType.count>0?objType:null;
                }));
            }
        );

    }


    if (args.zip) {
        console.log('I am here');
        console.log('I am here');
        body = {
            "query": {
                "match": {
                    "zip_id": args.zip
                }
            },
            "aggs": {

                "types": {
                    "terms": {
                        "field": "type_id"

                    }
                }
            }
        }
        return runQuery(Type, 'sale', body, (res)=> {
                var Aggs = res.aggregations.types;

                return Aggs.buckets.map(item=> {
                    let objType = {
                        id: item.key,
                        type: item.key,
                        count: item.doc_count
                    }
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log(objType);
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    console.log('run here Type.js');
                    // return objType;
                });
            }
        );

    }

}




