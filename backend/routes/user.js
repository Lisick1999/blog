const express = require('express');
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user');
const hasRole = require('../middlewares/hasRole');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');
const ROLES = require('../constants/roles');
const router = express.Router({ mergeParams: true });

// только аутентифицированный пользователь и пользователь с ролью АДМИН может получить доступ к контроллерам удалить/редактровать, поэтому их нужно подключить после мидлвэера authenticated

// возвращаем всех пользователей, добавляем мидлвэер hasRole, т.к. только АДМИН имеет доступ к этому эндпоинту
router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	// вызываем контроллер
	const users = await getUsers();

	// отправляем данные клиенту
	res.send({ data: users.map(mapUser) });
});

// получение ролей
router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), (req, res) => {
	// вызываем контроллер
	const roles = getRoles();

	// отправляем данные клиенту
	res.send({ data: roles });
});

// редактирование пользователя
router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	// изменять можно только роли, поэтому передается объект, из которого достается только одно поле. в схеме поле role, а фронт оперирует roleId
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	});

	res.send({ data: mapUser(newUser) });
});

// удаление пользователя
router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null });
});

module.exports = router;


