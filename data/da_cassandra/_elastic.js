import elasticsearch from 'elasticsearch';
import axios from 'axios';
import _ from 'lodash';

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'

});

function ensureNoErrorOrReport(qText, qVar, err, reject) {
    if (err) {

        reject(err); // Because terrisgit said so
    }
    else
        return true;
}

export function runQuery(objectPrototype, index, body, getResults) {
    return new Promise((resolve, reject) => {
        client.search({
            index: index,
            type: 'house',
            body: body
        }).then((res)=> {
            var items;
            if (getResults) {
                items = getResults(res);
            } else {

                items = res.hits.hits.map(item=> {
                    return item._source;
                });
                console.log('items' + items);

            }
            resolve(items.map(item=>new objectPrototype(item)));
        })

    })

}

export function runQueryOneResult(objectPrototype, index, query) {
    //
    return new Promise((resolve, reject) => {
        client.search({
            index: index,
            body: {
                query: {
                    match: {
                        _all: query
                    }
                }
            }
        }).then((res)=> {
            var hit = _.toArray(res.hits.hits)[0];
            resolve(new objectPrototype(hit._source));
        })

    });
}

export function runQueryNoResult(qText, qVar) {
    //
    return new Promise((resolve, reject) => {
        client.execute(qText, qVar, {prepare: true}, (err) => {
            if (ensureNoErrorOrReport(qText, qVar, err, reject)) {
                //
                resolve();
            }
        });
    });
}
