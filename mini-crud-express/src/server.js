const app = require('./app');

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`API tareas disponible en http://localhost:${PUERTO}/api/tareas`);
});