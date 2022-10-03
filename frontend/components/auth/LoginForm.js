import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signIn } from 'next-auth/react';
import Router from 'next/router';

import { Oval } from 'react-loader-spinner';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO - when users log in, it takes a long time until they are redirected to the dashboard, why is that?
const LoginForm = ({ setAuthType }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	async function loginUser(email, password) {
		setIsLoading(true);
		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callBackUrl: `${window.location.origin}`,
		});
		console.log(res);
		if (res.error) {
			setIsLoading(false);
			setError(res.error);
		} else {
			setIsLoading(false);
			toast.success('Successfully logged in!', {
				position: 'top-center',
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				closeButton: false,
				theme: 'colored',
			});

			setError(null);
			Router.replace(`/admin/dashboard`);
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().required('Required'),
		}),
		onSubmit: (values) => {
			loginUser(values.email, values.password);
		},
	});

	const emailWhiteSpaceFix = (e) => {
		if (e.key === ' ') {
			e.preventDefault();
		}
	};
	return (
		<>
			<ToastContainer
				className="!absolute !-top-24"
				limit={1}
				transition={Zoom}
			/>
			<h1 className="font-bold text-3xl mb-16">Login</h1>

			<form onSubmit={formik.handleSubmit} className="w-full relative">
				<div className="">
					<div className="flex flex-col relative mb-8">
						<label
							htmlFor="email"
							className="text-sm font-semibold text-zinc-700"
						>
							Email
						</label>
						<HiOutlineMail className="absolute top-8 left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 leading-tight mb-2"
							id="email"
							name="email"
							type="email"
							placeholder="Type your email"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							onKeyDown={emailWhiteSpaceFix}
							onChange={formik.handleChange}
						/>
						{formik.errors.email ? (
							<div className="text-red-700 text-sm font-bold">
								{formik.touched.email && formik.errors.email}
							</div>
						) : null}
					</div>
					<div className="flex flex-col relative">
						<label
							htmlFor="password"
							className="text-sm font-semibold text-zinc-700"
						>
							Password
						</label>

						<HiOutlineLockClosed className="absolute top-[35px] left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 mb-2"
							id="password"
							type="password"
							placeholder="Type your password"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className="text-red-700 text-sm font-bold">
								{formik.errors.password}
							</div>
						) : null}
					</div>
				</div>
				{error && (
					<div className="bg-red-200 w-full text-center py-2 text-red-700 font-semibold rounded-md mt-6 flex items-center justify-center relative">
						{' '}
						{error}
						<AiOutlineClose
							onClick={() => setError(null)}
							className="absolute right-4 cursor-pointer"
						/>
					</div>
				)}
				<button
					type="submit"
					className={`bg-black text-white font-bold uppercase w-full rounded-full py-2 tracking-wider self-end ${
						error ? 'mt-8' : 'mt-16'
					} flex items-center justify-center gap-2 relative hover:bg-opacity-80 transition-colors`}
				>
					Login{' '}
					{isLoading && (
						<Oval
							wrapperStyle={{ position: 'absolute', right: '37%' }}
							color="#fff"
							secondaryColor="#fff"
							height={16}
							width={16}
							strokeWidth={6}
							strokeWidthSecondary={8}
						/>
					)}
				</button>
			</form>

			<p className="mt-auto text-xs">
				Don't have an account?{' '}
				<span
					onClick={() => setAuthType('Register')}
					className="underline cursor-pointer hover:text-blue-700"
				>
					Sign up now
				</span>
			</p>
		</>
	);
};

export default LoginForm;
