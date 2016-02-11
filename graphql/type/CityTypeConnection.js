import {connectionDefinitions} from "graphql-relay";

import CityTypeType from './CityTypeType';

export default connectionDefinitions({
    name: 'CityTypes',
    nodeType: CityTypeType,
});
