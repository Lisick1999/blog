const Post = require('../models/Post');

// add (создание)
async function addPost(post) {
	const newPost = await Post.create(post);

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});

	return newPost;
}

// edit (редактирование)
async function editPost(id, post) {
	const newPost = await Post.findByIdAndUpdate(id, post, { returnDocument: 'after' });

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});

	return newPost;
}
// delete (удаление)
function deletePost(id) {
	return Post.deleteOne({ _id: id });
}
// get list with search and pagination (получение списка постов)
async function getPosts(search = '', limit = 10, page = 1) {
	// запросы на поиск постов
	const [posts, count] = await Promise.all([
		// первый запрос на поиск постов, необходимо искать по search
		// чтобы искать по куску текста, используем регулярное выражение
		// $regex - передается подстака , которую ищем search; $options - i (регистронезависимый поиск); .limi - отрезает нужное кол-во постов; .skip() - пропустить нужное кол-во постов; .sort() - получить новые посты сверху ( передается объект . как надо сортировать: по какому полю и в каком порядке)
		Post.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		// подсчет найденных постов
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
	]);

	return {
		posts,
		lastPage: Math.ceil(count / limit),
	};
}

// get item (получение одного поста)
function getPost(id) {
	return Post.findById(id).populate({
		path: 'comments',
		populate: 'author',
	});
}

module.exports = { addPost, editPost, deletePost, getPosts, getPost };
