import React, { useState, useEffect } from 'react';
import { useSession, signIn, getProviders } from 'next-auth/react';
import Router from 'next/router';
import axios from 'axios';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
	const { data: session, status } = useSession();
	const [authType, setAuthType] = useState('Login');
	console.log(status);

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
