const Comment = require('../models/Comment');
const Post = require('../models/Post');

// add (добавление)
async function addComment(postId, comment) {
	const newComment = await Comment.create(comment);

	await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

	// превратить поле из идентификатора в объект, который содержит информацию по этому идентификатору

	await newComment.populate('author');
	return newComment;
}

// delete (удаление)
async function deleteComment(postId, commentId) {
	// удаление комментария
	await Comment.deleteOne({ _id: commentId });

	// удалить комментарий у поста
	await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

module.exports = {
	addComment,
	deleteComment,
};
