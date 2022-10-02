import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { signIn } from 'next-auth/react';
import Router from 'next/router';

import { Oval } from 'react-loader-spinner';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = ({ setAuthType }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function registerUser(
		firstName,
		lastName,
		email,
		password,
		confirmPassword
	) {
		setIsLoading(true);

		// checking if passwords didn't match
		if (password !== confirmPassword) {
			setError('Passwords did not match');
			formik.values.password = '';
			formik.values.confirmPassword = '';
			setIsLoading(false);
			return;
		}

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
				setError(null);
				setIsLoading(null);
				toast.success('Successfully created user!', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					closeButton: false,
				});
				setAuthType('Login');
			})
			.catch((error) => {
				setError(error.response.data.error);
				setIsLoading(false);
			});
	}

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(15, 'Must be less than 16 characters')
				.required('Required'),
			lastName: Yup.string()
				.max(20, 'Must be less than 20 characters')
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string()
				.required('Required')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
					'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase and 1 Number '
				),
			confirmPassword: Yup.string().required('Required'),
		}),
		onSubmit: (values) => {
			registerUser(
				values.firstName,
				values.lastName,
				values.email,
				values.password,
				values.confirmPassword
			);
		},
	});

	const emailWhiteSpaceFix = (e) => {
		if (e.key === ' ') {
			e.preventDefault();
		}
	};
	return (
		<>
			<h1 className="font-bold text-3xl mb-16">Register</h1>
			{/* <span className="absolute top-6 left-6 text-xs">alz.news</span> */}
			<form onSubmit={formik.handleSubmit} className="w-full">
				<div className="">
					<div className="flex gap-8 justify-between mb-8">
						<div className="w-1/2 flex flex-col">
							<label
								htmlFor="firstName"
								className="text-sm font-semibold text-zinc-700"
							>
								First name
							</label>
							<input
								className="py-3 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 leading-tight"
								id="firstName"
								name="firstName"
								type="text"
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
								onChange={formik.handleChange}
							/>
							{formik.errors.firstName ? (
								<div className="text-red-700 text-sm font-bold">
									{formik.touched.firstName && formik.errors.firstName}
								</div>
							) : null}
						</div>
						<div className="w-1/2 flex flex-col">
							<label
								htmlFor="lastName"
								className="text-sm font-semibold text-zinc-700"
							>
								Last name
							</label>
							<input
								className="py-3 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 leading-tight"
								id="lastName"
								name="lastName"
								type="text"
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
								onChange={formik.handleChange}
							/>
							{formik.errors.lastName ? (
								<div className="text-red-700 text-sm font-bold">
									{formik.touched.lastName && formik.errors.lastName}
								</div>
							) : null}
						</div>
					</div>
					<div className="flex flex-col relative mb-6">
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
							type="email"
							name="email"
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
					<div className="flex flex-col relative mb-6">
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
							name="password"
							placeholder="Type your password"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						{formik.errors.password ? (
							<div className="text-red-700 text-sm font-bold">
								{formik.touched.password && formik.errors.password}
							</div>
						) : null}
					</div>
					<div className="flex flex-col relative">
						<label
							htmlFor="password"
							className="text-sm font-semibold text-zinc-700"
						>
							Confirm password
						</label>

						<HiOutlineLockClosed className="absolute top-[35px] left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 mb-2"
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							placeholder="Confirm your password"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={formik.handleBlur}
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
						/>
						{formik.errors.confirmPassword ? (
							<div className="text-red-700 text-sm font-bold">
								{formik.touched.confirmPassword &&
									formik.errors.confirmPassword}
							</div>
						) : null}
					</div>
				</div>
				{error && (
					<div className="bg-red-200 w-full text-center py-2 text-red-700 font-semibold rounded-md flex items-center justify-center mt-6 relative">
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
					Register{' '}
					{isLoading && (
						<Oval
							wrapperStyle={{ position: 'absolute', right: '33.5%' }}
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
				Already got an account?{' '}
				<span
					onClick={() => setAuthType('Login')}
					className="underline cursor-pointer hover:text-blue-700"
				>
					Sign in
				</span>
			</p>
		</>
	);
};

export default RegisterForm;
