import {connectionDefinitions} from "graphql-relay";

import TypeType from './TypeType';

export default connectionDefinitions( {
  name: 'Types',
  nodeType: TypeType
} );
