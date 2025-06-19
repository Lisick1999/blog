const express = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const router = express.Router({ mergeParams: true });

// подключение регистрации на пост запрос
router.post('/register', async (req, res) => {
	// обработка ошибки через трай кетч , т.к. регистрация не всегда может пройти успешно
	try {
		// получаем пользователя и токен
		const { user, token } = await register(req.body.login, req.body.password);

		// отправляем токен в куках, как при логине
		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.post('/login', async (req, res) => {
	// обработка ошибки через трай кетч , т.к. регистрация не всегда может пройти успешно
	try {
		// необходимо установить токен в куки. На выходе ожидаем объект с двумя полями
		const { user, token } = await login(req.body.login, req.body.password);

		// устанавливаем токен в куки, чтобы не было доступа из js, указать httpOly, после этого отправляем ответ с пользователем
		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

router.post('/logout', (req, res) => {
	// очищаем токен из кук
	res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
