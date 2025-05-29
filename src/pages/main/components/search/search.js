import styled from 'styled-components';
import { Input, Icon } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}

	& > input {
		padding: 10px 32px 10px 10px;
	}
`;
