const jwt = require('jsonwebtoken');

// подпись для json вебтокена
const sign = process.env.JWT_SECRET;

module.exports = {
	generate(data) {
		// возвращаем результат создания токена
		return jwt.sign(data, sign, { expiresIn: '30d' });
	},
	verify(token) {
		// получаем информацию, которая хранится в токене
		return jwt.verify(token, sign);
	},
};
