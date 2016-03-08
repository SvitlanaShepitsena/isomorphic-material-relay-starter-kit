import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import Helmet from 'react-helmet';
import {RoutingContext, match} from 'react-router';

import renderOnServer from './renderOnServer'

let assetsPath;
if( process.env.NODE_ENV == 'production' ){
    console.log('server prod');
  assetsPath = `/assets/0.7.7`;
}
else {
    console.log('server development');
  assetsPath = `http://localhost:8050/${process.env.npm_package_version}`;
}

let app = express();

// Serve HTML
app.get( '/*', ( req, res, next ) => {
    renderOnServer( req, res, next, assetsPath );
} );

export default app;
