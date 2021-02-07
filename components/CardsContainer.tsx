import React from 'react';
import QuizCard from '../components/QuizCard';
import StyledCardsContainer from '../styles/cardsContainerStyled';
import CategoryCard from './CategoryCard';
import UserCard from './UserCard';

/* --- Types --- */
import { CardsContainerProps } from '../types/categories';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../types/slices';
import { getQuizzesBySearchInput } from '../redux/slices/quizzes';
import { Button } from '../styles/styledGlobal';

const CardsContainer: React.FC<CardsContainerProps> = ({
	quizzes,
	categories,
	users,
}) => {
	const { totalPages, page } = useSelector((state: IState) => state.quizzes);
	const { savedInput } = useSelector((state: IState) => state.global);
	const dispatch = useDispatch();

	if (users) {
		return (
			<StyledCardsContainer>
				{users.map((user) => (
					<UserCard key={user._id} user={user} />
				))}
			</StyledCardsContainer>
		);
	}
	if (categories) {
		return (
			<StyledCardsContainer>
				{categories.map((category) => (
					<CategoryCard key={category._id} category={category} />
				))}
			</StyledCardsContainer>
		);
	}
	if (quizzes) {
		return (
			<>
				<StyledCardsContainer>
					{quizzes.map((quiz) => (
						<QuizCard key={quiz._id} quiz={quiz} />
					))}
				</StyledCardsContainer>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{Array(totalPages)
						.fill(true)
						.map((_, i) => (
							<Button
								style={{ width: '80px', margin: '10px' }}
								key={i}
								onClick={() => {
									dispatch(
										getQuizzesBySearchInput({
											input: savedInput,
											categoryFilter: '',
											page: i + 1,
										})
									);
									window.scrollTo(0, 0);
								}}
							>
								{i + 1}
							</Button>
						))}
				</div>
			</>
		);
	}
	return <h1>Cargando...</h1>;
};

export default CardsContainer;
