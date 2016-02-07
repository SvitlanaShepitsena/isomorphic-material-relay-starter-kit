import {connectionDefinitions} from "graphql-relay";

import HouseType from './HouseType';

export default connectionDefinitions( {
  name: 'Houses',
  nodeType: HouseType,
} );
