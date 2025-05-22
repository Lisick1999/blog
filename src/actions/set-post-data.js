import { ACTION_TYPE } from './action-type';

export const setPostData = (postData) => ({
	type: ACTION_TYPE,
	payload: postData,
});
