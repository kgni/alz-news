import React, { useState } from 'react';
import { useSession, signIn, getProviders } from 'next-auth/react';
import { Field, Form, Formik } from 'formik';
import Router from 'next/router';
import axios from 'axios';

const AuthPage = () => {
	const { data: session } = useSession();
	const [authType, setAuthType] = useState('Login');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	return <div>AuthPage</div>;
};

export default AuthPage;
