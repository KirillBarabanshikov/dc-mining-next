const express = require('express');
const next = require('next');

const dev = false;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let argv = require('minimist')(process.argv.slice(2));
let port = argv.p || 0;

nextApp.prepare().then(() => {
    const app = express();
    console.log('create');

    app.get('*', (req, res) => {
        return handle(req, res);
    });
    app.post('*', (req, res) => {
        return handle(req, res);
    });
    app.patch('*', (req, res) => {
        return handle(req, res);
    });
    app.delete('*', (req, res) => {
        return handle(req, res);
    });
    app.put('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on localhost:${port}`);
    });
});
