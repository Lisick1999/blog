// асинхронный экшен , который позволяет диспатчить другие экшены
import { setPostData } from "./set-post-data";

export const loadPostAsync = (requestServer, postId) = (dispatch) => {
	requestServer('fetchPost', postId).then((postData) => {
		dispatch(setPostData(postData));
	})
};
