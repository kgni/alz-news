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

	// TODO - if users are already logged in and try to access this page they should be redirected to the dashboard

	return (
		<section className="bg-black h-screen w-full justify-center flex items-center px-8">
			<div className="bg-white flex p-12 pb-8 rounded-lg  flex-col items-center w-[500px] min-h-[800px] relative">
				{authType === 'Login' && <LoginForm setAuthType={setAuthType} />}
				{authType === 'Register' && <RegisterForm setAuthType={setAuthType} />}
			</div>
		</section>
	);
};

export default AuthPage;
