import React, { useState } from 'react';
import { useSession, signIn, getProviders } from 'next-auth/react';
import { Field, Form, Formik } from 'formik';
import Router from 'next/router';
import axios from 'axios';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
	const { data: session } = useSession();
	const [authType, setAuthType] = useState('Login');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	console.log(authType);

	function redirectToHome() {
		const { pathname } = Router;

		if (pathname === '/auth') Router.push('/dashboard');
	}

	async function registerUser() {
		const res = await axios
			.post(
				'/api/register',
				{
					firstName,
					lastName,
					email,
					password,
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			.then(async () => {
				await loginUser();
				redirectToHome();
			})
			.catch((error) => console.log(error));
	}

	async function loginUser() {
		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: `${window.location.origin}`,
		});

		res.error ? console.log(res.error) : redirectToHome();
	}

	function onSubmitForm() {
		authType === 'Login' ? loginUser() : registerUser();
	}

	return (
		<section className="bg-black h-screen w-full justify-center flex items-center px-8">
			<div className="bg-white flex p-12 pb-8 rounded-lg  flex-col items-center w-[500px] min-h-[600px]">
				{authType === 'Login' && (
					<LoginForm
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						onSubmitForm={onSubmitForm}
						setAuthType={setAuthType}
					/>
				)}
				{authType === 'Register' && (
					<RegisterForm
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						onSubmitForm={onSubmitForm}
						setAuthType={setAuthType}
					/>
				)}
			</div>
		</section>
	);
};

export default AuthPage;
