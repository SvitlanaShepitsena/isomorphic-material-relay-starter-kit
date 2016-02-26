import Relay from 'react-relay';

export default {
  Viewer: () => Relay.QL`query { Viewer }`,
  House: () => Relay.QL`query { House }`
};
