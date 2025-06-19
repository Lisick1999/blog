require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const port = 3001; // порт, на котором будет запускаться приложение
const app = express(); // экземпляр приложения

// подключение мидлвэеров
app.use(express.static('../frontend/build'))

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

// подключение к базе данных
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	// после подключения к базе запустить приложение
	app.listen(port, () => {
		console.log(`Сервер запущен на порту ${port}`);
	});
});
