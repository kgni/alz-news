const mongoose = require('mongoose');
const express = require('express');
const app = express();
const middleware = require('./middlewares/middleware');

require('dotenv').config();
const { MONGODB_URI, PORT } = require('./configs/config');

const cors = require('cors');

// routes

const newsArticlesRouter = require('./controllers/newsArticles');
// const usersRouter = require('./controllers/users');
// const loginRouter = require('./controllers/login');

// console.log(MONGODB_URI, PORT);

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

app.use('/api/', newsArticlesRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
