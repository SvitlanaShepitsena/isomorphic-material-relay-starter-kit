import {connectionDefinitions} from "graphql-relay";

import ZipType from './ZipType';

export default connectionDefinitions( {
  name: 'Zips',
  nodeType: ZipType
} );
