const express = require('express');
const next = require('next');
const routes = require('../routes');

const authService = require('./services/auth');

const dev=process.env.NODE_ENV !== 'production';
const app = next({dev});

const handle = routes.getRequestHandler(app);

const secretData = [
    {
        title: 'Secret Data 1',
        description: 'plans for world domination'
    },
    {
        title: 'Secret Data 2',
        description: 'list of secret passwords'       
    }
];

app.prepare()
    .then(()=> {
        const server = express();

        // insert auth middleware to check access
        server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
            return res.json(secretData);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.use(handle).listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    }) 
    .catch ( (ex)=> {
        console.error(ex.stack);
        process.exit(1);
    })