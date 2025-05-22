import styled from 'styled-components';
import { PostContent, Comments } from './components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadPostAsync(params.id));
	}, []);
	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} />
		</div>
	);
};

export const Post = styled(PostContainer)``;
