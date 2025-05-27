import styled from 'styled-components';
import { PostContent, Comments, PostForm } from './components';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
// import { initialPostState } from '../../reducers';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id, isCreating]);
	return (
		<div className={className}>
			{isEditing || isCreating ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
