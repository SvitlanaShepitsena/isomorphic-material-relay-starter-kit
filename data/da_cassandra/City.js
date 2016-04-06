import {runQuery, runQueryOneResult} from './_elastic.js';
import _ from 'lodash';
import City from '../model/City'

export function City_by_house(house_id) {
    var body = {

        fields: ['city_id'],
        query: {
            match: {
                'id': house_id
            }
        }

    };

    return runQueryOneResult(City, 'sale', body);
}
export function City_get(city_id) {

    var body = {

        fields: ['city_id'],
        query: {
            match: {
                'city_id': city_id
            }
        }

    };

    return runQueryOneResult(City, 'sale', body, res=> {

        let city = _.first(res.hits.hits)

        let objCity = {
            id: city.fields.city_id,
            name: city.fields.city_id,
        };

        return objCity;
    });
}

export function City_by_zip(zip_id) {

    var body = {

        fields: ['city_id'],
        query: {
            match: {
                'zip_id': zip_id
            }
        }

    };
    return runQueryOneResult(City, 'sale', body);
}

export function Cities_with_args(args) {

    var body = {

<<<<<<< HEAD
        fields: ["city_id"],
=======
        fields: ['city_id'],
>>>>>>> work-local
        aggs: {
            cities: {
                terms: {
                    field: 'city_id',
<<<<<<< HEAD
                    size:100
=======
                    size: 100

>>>>>>> work-local
                }
            }
        }
    };


    return runQuery(City, 'sale', body, res=> {
        try {
            var citiesAggs = res.aggregations.cities;
            console.log(citiesAggs);

        } catch (e) {
            console.log(e.message);
        }

        var cities = citiesAggs.buckets.map(city=> {
            let objCity = {
                id: city.key,
                name: city.key,
                count: city.doc_count
            }

            return objCity;
        });
<<<<<<< HEAD
        console.log(cities);
        return cities;
=======
        return _.sortBy(cities, 'id');
>>>>>>> work-local
    });
}


