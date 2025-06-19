const express = require('express');
const {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
} = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const ROLES = require('../constants/roles');
const router = express.Router({ mergeParams: true });

// контроллеры получения одного и нескольких постов подключаем до мидлвэера authenticated, т.к. даже гости могут посмотреть один пост и список постов
router.get('/', async (req, res) => {
	const { posts, lastPage } = await getPosts(
		req.query.search,
		req.query.limit,
		req.query.page,
	);

	res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

// контроллер получения одного поста
router.get('/:id', async (req, res) => {
	const post = await getPost(req.params.id);

	res.send({ data: mapPost(post) });
});

// только аутентифицированный пользователь и пользователь с ролью АДМИН может получить доступ к контроллерам удалить/редактровать, поэтому их нужно подключить после мидлвэера authenticated

// добавление комментариев
router.post('/:id/comments', authenticated, async (req, res) => {
	const newComment = await addComment(req.params.id, {
		content: req.body.content,
		author: req.user.id,
	});

	res.send({ data: mapComment(newComment) });
});

router.delete(
	'/:postId/comments/:commentId',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.postId, req.params.commentId);

		res.send({ error: null });
	},
);

// редактирование, добавление и удаление постов подключить после мидлвэера authenticated, т.к. необходимо контролировать роли.
// добавление контроллеров для работы с постами

// добавление
router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newPost = await addPost({
		// фильтрация полей, которые попадут в контроллер
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	});

	res.send({ data: mapPost(newPost) });
});

// редактирование
router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatePost = await editPost(req.params.id, {
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	});

	res.send({ data: mapPost(updatePost) });
});

// удаление
router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deletePost(req.params.id);

	res.send({ error: null });
});

module.exports = router;
