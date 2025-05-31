import styled from 'styled-components';
import { Button } from '../../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	position: absolute;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;
	bottom: 140px;
	width: 100%;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		width: 100%;
		height: 32px;
		margin: 0 5px;
		border: 1px solid #000;
		text-align: center;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
	}
`;

Pagination.propTypes = {
	page: PropTypes.numberisRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
