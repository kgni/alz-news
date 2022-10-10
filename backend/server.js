const mongoose = require('mongoose');
const express = require('express');
const app = express();
const middleware = require('./middlewares/middleware');
const morgan = require('morgan');

require('dotenv').config();
const { MONGODB_URI, PORT } = require('./configs/config');

const cors = require('cors');

// routes

const apiRouter = require('./routes/apiRouter');

console.log(MONGODB_URI, PORT);

// Connect to DB and start listening to incoming requests:
const connectDB = async () => {
	await mongoose.connect(MONGODB_URI);
	console.log('Connected to DB');
	await app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
};
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/', apiRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
