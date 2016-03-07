import chalk from 'chalk';
import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import {match} from 'react-router';
import seqqueue from 'seq-queue';
import Helmet from "react-helmet";
import fs from 'fs';

import routes from './routes';
import {isomorphicVars} from './scripts/isomorphicVars';

// Read environment
require('dotenv').load();

// Load up isomorphic vars here, for server rendering
const isoVars = JSON.stringify(isomorphicVars());

// Create a queue for isomorphic loading of pasges, because the GrapQL network layer
var prod = process.env.NODE_ENV === 'production';
// // is a static
const queue = seqqueue.createQueue(2000);

// Render on server will assume always that it can use localhost to access the GraphQL server. It is
// not considered necessary to use the public URL.
const GRAPHQL_URL = ( isoVars.public_url == null ) ? `http://localhost:${process.env.PORT}/graphql` : isoVars.public_url + '/graphql';

export default (req, res, next, assetsPath) => {
    var headers = {};

    if (prod) {
        // webpack_isomorphic_tools.refresh();
        console.log('yes production');

        if (req.cookies.auth_token)
            headers.Cookie = 'auth_token=' + req.cookies.auth_token;
    } else{
        webpack_isomorphic_tools.refresh();
        console.log('no production');

    }
    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
            if (prod) {

                queue.push(
                    queueTask => {
                        // Setting the STATIC network layer. No fear about it being static - we are in a queue!
                        Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL, {headers: headers}));
                        RelayStoreData.getDefaultInstance().getChangeEmitter().injectBatchingStrategy(() => {
                        });

                        if (error)
                            next(error);
                        else if (redirectLocation)
                            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                        else if (renderProps)
                            IsomorphicRouter.prepareData(renderProps).then(render, next);
                        else
                            res.status(404).send('Not Found');

                        function render(data) {
                            try {

                                var assets = webpack_isomorphic_tools.assets().assets;

                                var allStyles = Object.keys(assets).map((key)=> {

                                    var file = assets[key];
                                    var oneFile = Object.keys(file).map(css=> {
                                        return `${css}:${file[css]}`;
                                    }).join(',');
                                    return oneFile;
                                }).join('');

                                fs.writeFileSync(path.resolve(__dirname, '..', 'public/assets/0.7.7', 'app.css'), allStyles);
                                // Setting up static, global navigator object to pass user agent to material-ui. Again, not to
                                // fear, we are in a queue.
                                GLOBAL.navigator = {userAgent: req.headers['user-agent']};

                                const reactOutput = ReactDOMServer.renderToString(
                                    <IsomorphicRouter.RouterContext {...renderProps} />
                                );
                                let helmet = Helmet.rewind();
                                res.render(path.resolve(__dirname, '..', 'webapp/views', 'index.ejs'), {
                                    preloadedData: JSON.stringify(data),
                                    assetsPath: assetsPath,
                                    helmet,
                                    reactOutput,
                                    isomorphicVars: isoVars
                                });
                            }
                            catch (err) {
                                console.log(err.stack);
                            }

                            queueTask.done();
                        }
                    }, () => 2000);
            } else {
                res.render(path.resolve(__dirname, '..', 'webapp/views', 'index-dev.ejs'), {
                    // preloadedData: JSON.stringify(data),
                    assetsPath: assetsPath,
                    // helmet,
                    // reactOutput,
                    // isomorphicVars: isoVars
                });
            }
        }
    );
};
