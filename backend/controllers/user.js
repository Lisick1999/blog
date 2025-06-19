const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

// register (регистрация)
async function register(login, password) {
	// если пароль приходит пустой, выбросить ошибку
	if (!password) {
		throw new Error('Password is empty');
	}

	// хэщирование пароля
	const passwordHash = await bcrypt.hash(password, 10);

	// создание пользователя
	const user = await User.create({ login, password: passwordHash });

	// вход после регистрации
	// генерируем токен, как при логине
	const token = generate({ id: user.id });

	// возвращаем токен вместе с пользователем
	return { user, token };
}

// login (вход)
async function login(login, password) {
	// ищем пользователя
	const user = await User.findOne({ login });

	// если пользователя нет, выбрасываем ошибку
	if (!user) {
		throw new Error('User not found');
	}

	// сравниваем пароли (который пришел и хранящийся)
	const isPasswordMatch = await bcrypt.compare(password, user.password);

	// если пароли не сходятся, выбрасываем ошибку
	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}

	// если всё ок, генерируем токен (это сделает отдельный хэлпер), генерация происходит из идентификатора пользователя
	const token = generate({ id: user.id });

	// возвращаем информацию о токене и о пользователе
	return { token, user };
}

// ДЛЯ АДМИНИСТРАТОРА

// получение пользователей
function getUsers() {
	return User.find();
}

// получение ролей. Т.к. роли сохранены в переменных, нужен контроллер, который формирует массив с данными о ролях
function getRoles() {
	return [
		{ id: ROLES.ADMIN, name: 'Admin' },
		{ id: ROLES.MODERATOR, name: 'Moderator' },
		{ id: ROLES.USER, name: 'User' },
	];
}

// delete (удаление пользователя)
function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

// edit (roles) (изменение пользователя (роли))
function updateUser(id, userData) {
	// вернуть документ, который содержит обновленные данные
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

module.exports = { register, login, getUsers, getRoles, deleteUser, updateUser };
