const { verify } = require('../helpers/token');
const User = require('../models/User');

// проверка, что пользователь залогинен
module.exports = async function (req, res, next) {
	// расшифровка токена и поиск пользователя
	// При логине передается идентификатор пользователя
	const tokenData = verify(req.cookies.token);

	const user = await User.findOne({ _id: tokenData.id });

	// если пользователя нет, передаем ошибку на фронт
	if (!user) {
		res.send({ error: 'Authenticated user not found' });

		return;
	}

	// иначе добавляем в реквест поле со всей информацией о пользователе
	req.user = user;

	next();
};
