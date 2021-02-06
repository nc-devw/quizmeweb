import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { HomeStyled } from '../styles/homeStyled';
import Image from 'next/image';
import React, { useState } from 'react';
import { userLogin } from '../redux/slices/user';

const Home = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [focus, setFocus] = useState(false);
	const [input, setInput] = useState({
		email: '',
		password: '',
	});
	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = {
			...input,
			[ev.target.name]: ev.target.value,
		};
		setInput(newValue);
	};
	const handleSubmit = (ev: React.FormEvent) => {
		ev.preventDefault();
		dispatch(userLogin(input));
		router.push('/panel');
	};
	return (
		<div>
			<Head>
				<title>Quizme App</title>
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
				/>
			</Head>
			<HomeStyled>
				<div className='home__logo'>
					<Image
						src='/assets/logo.png'
						width={500}
						height={500}
						alt='Picture'
					/>
					<h1>QuizMe Web</h1>
				</div>
				<form onSubmit={handleSubmit} className='home__form'>
					<input
						type='email'
						name='email'
						placeholder='email'
						onChange={handleChange}
						className='form__input'
					/>
					<input
						className='form__input'
						placeholder='password'
						type='password'
						name='password'
						onChange={handleChange}
					/>
					<button type='submit' className='form__btn'>
						Enviar
					</button>
				</form>
			</HomeStyled>
		</div>
	);
};
export default Home;
