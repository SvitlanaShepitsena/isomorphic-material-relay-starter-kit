import {runQuery, runQueryOneResult, runCountQuery} from './_elastic.js';

import _ from 'lodash';
import House from '../model/House';

export function House_get(id) {
    var body = {};

    body.query =
    {
        "filtered": {
            "query": {
                "match_all": {}
            },
            "filter": {
                "term": {
                    "id": id

                }
            }
        }
    }
    return runQueryOneResult(House,'sale',body,res=>{

        var item =  res.hits.hits[0]._source;
        console.log("ITEM IS" + item);

        return item;

    });

}

export function Houses_with_args_count(args) {
    var body = {};

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
                query: {
                    match_all: {}
                },
                filter: {
                    term: {city_id: args.city}
                }
            }
        }
        return runCountQuery('sale', body);
    }

    if (!(args.city && args.zip && args.type)) {
        body.query =
        {
            query: {
                match_all: {}
            }

        }
    }

    if (args.zip && !args.type) {
        body.query =
        {
            filtered: {
                query: {
                    match_all: {}
                },
                filter: {
                    term: {zip_id: args.zip}
                }
            }
        }
    }

    if (args.city && args.zip && !args.type) {
        if (args.zip !== 'all') {
            if (!args.zip.match(/^\d+$/)) {

                body.query = {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": {and:[
                            {
                                "term": {
                                    "type_id": args.zip
                                }
                            },
                            {
                                "term": {
                                    "city_id": args.city
                                }
                            }
                        ]}
                    }
                }
            } else {
                body.query = {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": [
                            {
                                "term": {
                                    "zip_id": args.zip
                                }
                            }

                        ]
                    }
                }

            }
        } else {
            body.query = {
                "filtered": {
                    "query": {
                        "match_all": {}
                    },
                    "filter": [

                        {
                            "term": {
                                "city_id": args.city
                            }
                        }
                    ]
                }
            }

        }
    }

    if (args.zip && args.type) {

        body.query = {
            "filtered": {
                "query": {
                    "match_all": {}
                },
                "filter": {and:[
                    {
                        "term": {
                            "zip_id": args.zip
                        }
                    },
                    {
                        "term": {
                            "type_id": args.type
                        }
                    }
                ]}
            }
        }
    }

    if (args.city && args.type && !args.zip) {

        body.query = {
            "filtered": {
                "query": {
                    "match_all": {}
                },
                "filter": {and:[
                    {
                        "term": {
                            "type_id": args.type
                        }
                    },
                    {
                        "term": {
                            "city_id": args.city
                        }
                    }
                ]}
            }
        }
    }
    return runCountQuery('sale', body);
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
                query: {
                    match_all: {}
                },
                filter: {
                    term: {city_id: args.city}
                }
            }
        }
        return runQuery(House, 'sale', body, getResults);
    }

    if (!(args.city && args.zip && args.type)) {
        body.query =
        {
            query: {
                match_all: {}
            }

        }
    }

    if (args.zip && !args.type) {
        body.query =
        {
            filtered: {
                query: {
                    match_all: {}
                },
                filter: {
                    term: {zip_id: args.zip}
                }
            }
        }
    }

    if (args.city && args.zip && !args.type) {
        if (args.zip !== 'all') {
            if (!args.zip.match(/^\d+$/)) {

                body.query = {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": {and:[
                            {
                                "term": {
                                    "type_id": args.zip
                                }
                            },
                            {
                                "term": {
                                    "city_id": args.city
                                }
                            }
                        ]}
                    }
                }
            } else {
                body.query = {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": [
                            {
                                "term": {
                                    "zip_id": args.zip
                                }
                            }

                        ]
                    }
                }

            }
        } else {
            body.query = {
                "filtered": {
                    "query": {
                        "match_all": {}
                    },
                    "filter": [

                        {
                            "term": {
                                "city_id": args.city
                            }
                        }
                    ]
                }
            }

        }
    }

    if (args.zip && args.type) {

        body.query = {
            "filtered": {
                "query": {
                    "match_all": {}
                },
                "filter": {and:[
                    {
                        "term": {
                            "zip_id": args.zip
                        }
                    },
                    {
                        "term": {
                            "type_id": args.type
                        }
                    }
                ]}
            }
        }
    }

    if (args.city && args.type && !args.zip) {

        body.query = {
            "filtered": {
                "query": {
                    "match_all": {}
                },
                "filter": {and:[
                    {
                        "term": {
                            "type_id": args.type
                        }
                    },
                    {
                        "term": {
                            "city_id": args.city
                        }
                    }
                ]}
            }
        }
    }


    return runQuery(House, 'sale', body, getResults);
}


