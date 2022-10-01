import React from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const RegisterForm = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	password,
	setPassword,
	onSubmitForm,
	setAuthType,
}) => {
	return (
		<>
			<h1 className="font-bold text-3xl mb-16">Register</h1>
			<form className="w-full">
				<div className="mb-16">
					<div className="flex gap-8 justify-between">
						<div className="w-1/2 flex flex-col">
							<label
								htmlFor="firstName"
								className="text-sm font-semibold text-zinc-700"
							>
								First name
							</label>
							<input
								className="py-3 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 mb-8 leading-tight"
								id="firstName"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="w-1/2 flex flex-col">
							<label
								htmlFor="lastName"
								className="text-sm font-semibold text-zinc-700"
							>
								Last name
							</label>
							<input
								className="py-3 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 mb-8 leading-tight"
								id="lastName"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col relative mb-8">
						<label
							htmlFor="email"
							className="text-sm font-semibold text-zinc-700"
						>
							Email
						</label>
						<HiOutlineMail className="absolute top-8 left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300 leading-tight"
							id="email"
							type="email"
							placeholder="Type your email"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={(e) => (e.target.placeholder = 'Type your password')}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col relative mb-8">
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
					<div className="flex flex-col relative">
						<label
							htmlFor="password"
							className="text-sm font-semibold text-zinc-700"
						>
							Repeat password
						</label>

						<HiOutlineLockClosed className="absolute top-[35px] left-2 text-xl text-gray-300" />
						<input
							className="p-3 pl-10 focus:outline-none border-b-2 border-b-gray placeholder:font-semibold placeholder:text-gray-300"
							id="password"
							type="password"
							placeholder="Repeat your password"
							onFocus={(e) => (e.target.placeholder = '')}
							onBlur={(e) => (e.target.placeholder = 'Repeat your password')}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<button
					onClick={onSubmitForm}
					className="bg-black text-white font-bold uppercase w-full rounded-full py-2 tracking-wider self-end"
				>
					Register
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
