import {connectionDefinitions} from "graphql-relay";

import CityZipType from './CityZipType';

export default connectionDefinitions({
    name: 'CityZips',
    nodeType: CityZipType,
});
