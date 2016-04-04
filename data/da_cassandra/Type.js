import {runQuery, runQueryNoResult, runQueryOneResult, Uuid} from './_elastic';

import Type from '../model/Type'
import _ from 'lodash';

export function Types_with_args(args) {

    var body;



    if (args.city && args.zip) {
        body = {
            "query": {
                "filtered": {
                    "query":    { "match_all": {}},
                    "filter":   { "and": {
                        "filters": [
                            {
                                "term": {
                                    "city_id": args.city
                                }},
                            {
                                "term": {
                                    "zip_id": args.zip
                                }}
                        ]
                    }}

                }
            },
            "aggs": {

                "types": {
                    "terms": {
                        "field": "type_id",
                        "size":100

                    }
                }
            }
        }
        return runQuery(Type, 'sale', body, (res)=> {
                var Aggs = res.aggregations.types;

                return _.compact(Aggs.buckets.map(item=> {

                    let objType = {
                        id: item.key,
                        type: item.key,
                        count: item.doc_count
                    }







                    return objType;
                }));
            }
        );

    }


    // if (args.zip) {
    //
    //
    //     body = {
    //         "query": {
    //             "match": {
    //                 "zip_id": args.zip
    //             }
    //         },
    //         "aggs": {
    //
    //             "types": {
    //                 "terms": {
    //                     "field": "type_id"
    //
    //                 }
    //             }
    //         }
    //     }
    //     return runQuery(Type, 'sale', body, (res)=> {
    //             var Aggs = res.aggregations.types;
    //
    //             return Aggs.buckets.map(item=> {
    //                 let objType = {
    //                     id: item.key,
    //                     type: item.key,
    //                     count: item.doc_count
    //                 }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //                 return objType;
    //             });
    //         }
    //     );
    //
    // }

}




