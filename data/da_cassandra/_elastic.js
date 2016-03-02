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

export function runQueryElastic(objectPrototype, index, query) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:9200/house/_search?q='+query).then(res=> {
            var hits = _.toArray(res.data.hits.hits);
            console.log('run here _elastic.js');
            resolve(hits.map(hit=>new objectPrototype(hit._source)));
        }, (err)=> {

            console.log('nnnnnnnnnnnnnn');
            throw new Error(err);

        });
    })

}

export function runQueryOneResult(objectPrototype, qText, qVar) {
    //
    return new Promise((resolve, reject) => {
        client.execute(qText, qVar, {prepare: true}, (err, result) => {
            if (ensureNoErrorOrReport(qText, qVar, err, reject)) {
                //
                if (result.rowLength > 0) {
                    let row = result.rows[0];
                    const retObj = new objectPrototype(row);
                    resolve(retObj);
                }
                else
                    resolve(null);
            }
        });
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
