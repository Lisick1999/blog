export const deletePost = (postID) =>
	fetch(`http://localhost:3005/posts/${postID}`, {
		method: 'DELETE',
	});
