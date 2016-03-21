import chalk from 'chalk';
import express from 'express';
import cookieParser from 'cookie-parser';
import graphQLHTTP from 'express-graphql';
import compression from 'compression';
import jwt from 'jwt-simple';
import path from 'path';

import webapp from '../webapp/server'; // React server
import schema from '../graphql/schema'; // Schema for GraphQL server

// Read environment
require('dotenv').load();

// console.log(chalk.blue('----------------------------------------------------------------------------------------------------'));
// console.log('Application ' + chalk.bold.magenta(process.env.npm_package_name) + ' version ' + chalk.bold.magenta(process.env.npm_package_version) + ' running in ' + chalk.bold.magenta(process.env.NODE_ENV));
// console.log(chalk.blue('----------------------------------------------------------------------------------------------------'));

let router = express();

router.get('/*', function (req, res, next) {
    var protocol = 'http' + (req.connection.encrypted ? 's' : '') + '://'
        , host = req.headers.host
        , href
        ;

    // console.log(host)

    if (/^www\./i.test(host)) {
        next();
        return;
    } else {


        // remove www.
        host = 'www.' + host;
        href = protocol + host + req.url;
        res.statusCode = 301;
        res.setHeader('Location', href);
        res.write('Redirecting to ' + host + req.url + '');
        res.end();
    }
});

router.set('trust proxy', 'loopback');
router.set('x-powered-by', false);

router.use(compression());
router.use(cookieParser());

// Graphql server
router.use('/graphql', graphQLHTTP(request => {
    let user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous

    return ( {
        schema: schema,
        rootValue: {user_id: user_id},
        pretty: true,
        graphiql: true
    } )
}));

// Static assets server
let oneYear = 365 * 86400000;
router.use(express.static(path.resolve(__dirname + '/../public/'), {maxAge: oneYear}));

// Application with routes
router.use('/*', webapp);

let server = router.listen(process.env.NODE_ENV === 'production' ? 80 : 4444);

export default server;
