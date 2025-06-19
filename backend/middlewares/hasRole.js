// проверка ролей. функция ждет . что в объекте запроса уже есть пользователь, т.е. до нее нужно включить authenticated

// отдает функцию, которая вернет функцию
module.exports = function (roles) {
	// функция проверяет , есть ли у пользователя какая-то из ролей
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.send({ error: 'Access denied' });

			return;
		}

		next();
	};
};
