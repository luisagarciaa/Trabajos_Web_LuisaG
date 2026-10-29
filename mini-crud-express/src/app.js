// configurar express app.use le de un orden para cada peticion que se haga a la app 

const express = require('express');
const tareasRouter = require('./routes/tareas.routes');
const HttpError = require('./utils/HttpError');
const app = express(); 
// convertir el cuerpo de la peticion req.body 
app.use(express.json());  
// 2. Rutas
app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok' });
});

app.use('/api/tareas', tareasRouter);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err instanceof HttpError ? err.status : 500;
    res.status(status).json({
        error: status === 500 ? 'Error interno del servidor' : err.message,
    });
});

module.exports = app;