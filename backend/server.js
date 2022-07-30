const mongoose = require('mongoose');
const express = require('express');
const app = express();
const middleware = require('./src/middlewares/middleware');

const cors = require('cors');

// routes

const articlesRouter = require('./src/controllers/articles');
// const usersRouter = require('./controllers/users');
// const loginRouter = require('./controllers/login');

// Connect to DB and start listening to incoming requests:
const connectDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI);
	console.log('Connected to DB');
	await app.listen(process.env.PORT, () => {
		console.log(`Listening on port ${process.env.PORT}`);
	});
};
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api/articles', articlesRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
