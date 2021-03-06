import express from 'express';
import React from 'react';
import renderOnServer from './renderOnServer'

let assetsPath;

if (process.env.NODE_ENV == 'production') {
    assetsPath = `/assets/0.7.7`;
}
else {
    assetsPath = `http://localhost:8050/${process.env.npm_package_version}`;
}

let app = express();

// Serve HTML
app.get('/*', (req, res, next) => {
    renderOnServer(req, res, next, assetsPath);
});

export default app;
