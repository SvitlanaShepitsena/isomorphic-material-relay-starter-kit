import {runQuery, runQueryOneResult} from './_elastic.js';

import City from '../model/City'

export function City_get(city) {
    let cqlText = 'select * from city where id = ? ALLOW FILTERING;';
    let cqlParams = [city];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function City_by_house(city_id) {
    let cqlText = 'SELECT * FROM city WHERE id = ? ';
    let cqlParams = [city_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function City_by_zip(zip_id) {
    let cqlText = 'SELECT * FROM city WHERE id = ? ';
    let cqlParams = [zip_id];

    return runQueryOneResult(City, cqlText, cqlParams);
}

export function Cities_with_args(args) {

    var body = {

        fields: ['city_id'],
        aggregations: {
            cities: {
                terms: {
                    field: 'city_id'
                }
            }
        }

    }

    return runQuery(City, 'sale', body, res=> {
        var citiesAggs = res.aggregations.cities;

        var cities = citiesAggs.buckets.map(city=> {
            let objCity = {
                id: city.key,
                name: city.key,
                count:city.doc_count
            }
            console.log(objCity);
            return objCity;
        });
        return cities;
    });
}


