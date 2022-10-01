import React from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const LoginForm = ({
	email,
	setEmail,
	password,
	setPassword,
	onSubmitForm,
	setAuthType,
}) => {
	return (
		<>
			<h1 className="font-bold text-3xl mb-16">Login</h1>
			<form action="/" className="w-full">
				<div className="mb-16">
					<div className="flex flex-col relative">
						<label
							htmlFor="email"
							className="text-sm font-semibold text-zinc-700"
						>
							Email
						</label>
						<HiOutlineMail className="absolute top-8 left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 mb-8 leading-tight"
							id="email"
							type="email"
							placeholder="Type your email"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={(e) => (e.target.placeholder = 'Type your password')}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
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
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300"
							id="password"
							type="password"
							placeholder="Type your password"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={(e) => (e.target.placeholder = 'Type your password')}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<button
					onClick={onSubmitForm}
					className="bg-black text-white font-bold uppercase w-full rounded-full py-2 tracking-wider self-end"
				>
					Login
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
