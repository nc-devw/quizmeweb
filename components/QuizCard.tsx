import React from 'react';
import StyledQuizCard from '../styles/quizCardStyled';
import Link from 'next/link';
import strings from '../pages/strings';
import { useDispatch, useSelector } from 'react-redux';
import { destroyQuiz } from '../redux/slices/quizzes';

/* --- Types --- */
import { IState } from '../types/slices';
import { QuizCardProps } from '../types/quizzes';

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
	const { language } = useSelector((state: IState) => state.global);
	const s = strings[language];
	const dispatch = useDispatch();

	return (
		<StyledQuizCard>
			<div className='card__img'>
				<img src={quiz.image} alt='Alt' />
			</div>
			<div className='card__info'>
				<Link href={`/quizzes/${quiz._id}`}>
					<h1 className='info__title'>{quiz.title}</h1>
				</Link>
				<p className='info__desc'>{quiz.description}</p>
				<button
					className='card__button error'
					onClick={() => {
						dispatch(destroyQuiz(quiz._id));
					}}
				>
					{s.DeleteBtn}
				</button>
			</div>
		</StyledQuizCard>
	);
};

export default QuizCard;
