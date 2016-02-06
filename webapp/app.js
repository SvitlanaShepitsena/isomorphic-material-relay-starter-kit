import { browserHistory } from 'react-router';

// First load isomorphic-relay:
import IsomorphicRelay from 'isomorphic-relay';
// And only then load react-relay:
import Relay from 'react-relay';

import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';

import {isomorphicVars} from './scripts/isomorphicVars';
import routes from './routes';

import './styles/main.css';

var isoVars = isomorphicVars( );

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );

// This will ensure that on the client Relay is passing the HttpOnly cookie with auth
let GraphQL_URL = ( isoVars.public_url == null ) ? '/graphql' : isoVars.public_url + '/graphql';
Relay.injectNetworkLayer( new Relay.DefaultNetworkLayer( GraphQL_URL, { credentials: 'same-origin' } ) );

const data = JSON.parse( document.getElementById( 'preloadedData' ).textContent );
IsomorphicRelay.injectPreparedData( data );

const rootElement = document.getElementById('root');

ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
    rootElement
);
