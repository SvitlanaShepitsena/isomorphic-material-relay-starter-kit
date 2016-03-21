import elasticsearch from 'elasticsearch';
import axios from 'axios';
import _ from 'lodash';

var client = new elasticsearch.Client({
    // host: 'http://readonly:wp19bf7c6srl6na0dw@be0b02e7ce5ed1a8d97a31cab78e71b4.us-east-1.aws.found.io:9200/',
    host: 'http://localhost:9200/',
    apiVersion: '2.2'
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
            }
            resolve(items.map(item=>new objectPrototype(item)));
        })
    })
}

export function runCountQuery(index, body, getResults) {
    return new Promise((resolve, reject) => {
        try {
            client.search({
                index: index,
                type: 'house',
                body: body
            }).then((res)=> {
                var count;

                if (getResults) {
                    count = getResults(res);
                } else {
                    count = res.hits.total;

                }
                resolve(count)
            })

        } catch (e) {

        }

    })

}

export function runQueryOneResult(objectPrototype, index, body, getResults) {
    return new Promise((resolve, reject) => {
        client.search({
            index: index,
            type: 'house',
            body: body
        }).then((res)=> {

            var item;
            if (getResults) {
                item = getResults(res);
            }

            resolve(new objectPrototype(item));
        })

    })

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
