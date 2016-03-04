import elasticsearch from 'elasticsearch';
import axios from 'axios';
import _ from 'lodash';

var client = new elasticsearch.Client({
    host: 'localhost:9200',

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
    console.log(body);
    return new Promise((resolve, reject) => {
        try {
            console.log('START QUERY');
        client.search({
            index: index,
            type: 'house',
            body: body
        }).then((res)=> {
            console.log(res);

            var count;
            if (getResults) {
                count = getResults(res);
            } else {
                count = res.hits.total;

            }
            console.log(count);
            resolve(count)
        })


        } catch (e) {
            console.log(e.trace);

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
