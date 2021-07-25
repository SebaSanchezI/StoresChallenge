//SERVER EXPRESS
const express = require ('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('/Users/Xeba/Desktop/Challenge NCR/api/swagger.yaml');
//const swaggerJsDoc = require('swagger-jsdoc');

const routes = require('./routes/index.js');

const server = express();

const {FRONTEND_URL} = process.env;

//MIDDLEWARES >> ver mas en docu express
server.use(express.json());//para que entienda formato JSON
server.use(express.urlencoded())
server.use(morgan('dev'));
server.use(cookieParser());

server.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'authorization',
		],
	})
);

//ROUTES

//server.use('/api-docs',swaggerUI.serve, swaggerUI.setup(specs));
server.use('/api', routes);
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//SWAGGER


module.exports = server;