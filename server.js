const express = require('express');
const cors = require('cors');
require('dotenv').config();
const StudioGhibliRouter = require('./routes/studioghibli');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.basePath = '/api/v2';
        this.studioGhibliPath = `${this.basePath}/studioghibli`;

        this.middlewares();
        this.routes();
        this.handleErrors();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.studioGhibliPath, StudioGhibliRouter);
    }

    handleErrors() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('¡Algo salió mal!');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
