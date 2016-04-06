import Helmet from "react-helmet";
import IsomorphicRouter from 'isomorphic-relay-router';
import {isomorphicVars} from './scripts/isomorphicVars';
import {match} from 'react-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import routes from './routes';
/*Seq-queue is simple tool to keep requests to be executed in order*/
import seqqueue from 'seq-queue';

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
        if (req.cookies.auth_token)
            headers.Cookie = 'auth_token=' + req.cookies.auth_token;
    } else {
        webpack_isomorphic_tools.refresh();
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
                        else if (renderProps) {
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                            IsomorphicRouter.prepareData(renderProps).then(render, next);
                        }
                        else
                            res.status(404).send('Not Found');

                        function render(data) {
                            var txtData;
                            try {
                                GLOBAL.navigator = {userAgent: req.headers['user-agent']};

                                try {
                                    txtData = JSON.stringify(data);
                                } catch (e) {
                                    console.log(e.stack);
                                    console.log(e.message);

                                }
                                console.log(txtData);

                                const reactOutput = ReactDOMServer.renderToString(
                                    <IsomorphicRouter.RouterContext {...renderProps} />
                                );
                                let helmet = Helmet.rewind();
                                res.render(path.resolve(__dirname, '..', 'webapp/views', 'index.ejs'), {
                                    preloadedData: txtData,
                                    assetsPath: assetsPath,
                                    helmet,
                                    reactOutput,
                                    isomorphicVars: isoVars
                                });
                            }
                            catch (err) {
                            }
                            queueTask.done();
                        }
                    }, () => 2000);
            } else {
                var assets = webpack_isomorphic_tools.assets().assets;

                var inlineStyles = Object.keys(assets).map(key=> {
                    var file = assets[key];
                    return Object.keys(file).map(css=> {
                        return css == '_style' ? `${file[css]}` : '';
                    });
                }).join(' ').replace(/,/g, '');

                let helmet = Helmet.rewind();
                res.render(path.resolve(__dirname, '..', 'webapp/views', 'index-dev.ejs'), {
                    // preloadedData: JSON.stringify(data),
                    inlineStyles,
                    assetsPath,
                    helmet
                    // reactOutput,
                    // isomorphicVars: isoVars
                });
            }
        }
    );
};
