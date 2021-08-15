const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Documentation
const cors = require('cors');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(bodyParser.json());

//MONGODB CONNECTION
require('./database');

//IMPORT ROUTE
const clienteRoute = require('./routes/cliente');
const productoRoute = require('./routes/producto');
const rolRoute = require('./routes/rol');
const userRoute = require('./routes/usuario');
const presupuestoRoute = require('./routes/presupuesto');
const presupuestoDetalleRoute = require('./routes/presupuesto_detalle');
const loginRoute = require('./routes/login');
const estadoRoute = require('./routes/estado');
const clasificacionRoute = require('./routes/clasificacion');

//INIT ROUTE
app.use('/estado', estadoRoute);
app.use('/cliente', clienteRoute);
app.use('/producto', productoRoute);
app.use('/clasificacion', clasificacionRoute);
app.use('/rol', rolRoute);
app.use('/usuario', userRoute);
app.use('/presupuesto', presupuestoRoute);
app.use('/presupuesto_detalle', presupuestoDetalleRoute);
app.use('/login', loginRoute);

//START SERVER
app.listen(8000);