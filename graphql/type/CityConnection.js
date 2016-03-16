import {connectionDefinitions} from "graphql-relay";

import CityType from './CityType';

export default connectionDefinitions( {
  name: 'Cities',
  nodeType: CityType,
} );
