import {runQuery, runQueryOneResult} from './_elastic.js';

import Zip from '../model/Zip'

export function Zips_with_args(args) {
    var body;

    if (!(args.city)) {
        body = {

            fields: ['zip_id'],
            aggregations: {
                zips: {
                    terms: {
                        field: 'zip_id'
                    }
                }
            }

        };

        return runQuery(Zip, 'sale', body, (res)=> {
                var Aggs = res.aggregations.zips;

                return Aggs.buckets.map(item=> {
                    let objZip = {
                        id: item.key,
                        zip: item.key,
                        count: item.doc_count
                    }
                    
                    return objZip;
                });
            }
        );
    }

    if (args.city) {
        body = {
            "query": {
                "match": {
                    "city_id": args.city
                }
            },
            "aggs": {

                "zips": {
                    "terms": {
                        "field": "zip_id"

                    }
                }
            }
        }
        return runQuery(Zip, 'sale', body, (res)=> {
                var Aggs = res.aggregations.zips;

                return Aggs.buckets.map(item=> {
                    let objZip = {
                        id: item.key,
                        zip: item.key,
                        count: item.doc_count
                    }
                    
                    return objZip;
                });
            }
        );
    }

}






