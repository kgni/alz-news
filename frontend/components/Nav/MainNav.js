import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';

import { FaUser, FaCog } from 'react-icons/fa';
import { TbDashboard } from 'react-icons/tb';
import { IoLogOut } from 'react-icons/io5';
import {
	AiOutlineCaretDown,
	AiOutlineCaretUp,
	AiFillHeart,
} from 'react-icons/ai';

const MainNav = () => {
	const { data: session, status } = useSession();
	console.log(session);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	console.log(isDropDownOpen);

	const dashBoardLink =
		session?.user.role === 'admin' ? (
			<Link href="/admin/dashboard">
				<a className="flex items-center gap-2 hover:text-white">
					<FaUser /> <p>Dashboard</p>
				</a>
			</Link>
		) : (
			<Link href="/dashboard">
				<a className="flex items-center gap-2 hover:text-white">
					<FaUser /> <p>Dashboard</p>
				</a>
			</Link>
		);

	return (
		<nav className="w-[90%] max-w-[1900px] mx-auto py-12 flex justify-between items-center text-black">
			<Link href="/">
				<span className="uppercase font-bold text-2xl cursor-pointer">
					Alz<span>.</span>
					<span className="text-xl">news</span>
				</span>
			</Link>
			<ul className="flex gap-x-8 items-center font-bold">
				<Link href="/">
					<li className="cursor-pointer hover:text-gray-600 duration-200">
						ALZHEIMER'S AND DEMENTIA
					</li>
				</Link>
				<Link href="/">
					<li className="cursor-pointer hover:text-gray-600 duration-200">
						NEWS
					</li>
				</Link>
				<Link href="/">
					<li className="cursor-pointer hover:text-gray-600 duration-200">
						JOURNALS
					</li>
				</Link>
			</ul>
			<ul className="flex gap-x-8 font-semibold items-center text-lg">
				{
					session ? (
						<li
							onClick={() => setIsDropDownOpen((prev) => !prev)}
							className={`cursor-pointer duration-200 flex items-center gap-3 relative ${
								isDropDownOpen ? '' : ''
							}`}
						>
							{isDropDownOpen && (
								<ul className="bg-black text-gray-400 p-8 rounded-md absolute  top-14 right-0 shadow-md flex flex-col z-50 gap-4 w-52 items-start">
									{dashBoardLink}
									<Link
										href="/dashboard/liked-articles"
										className="cursor-pointer"
									>
										<a className="flex items-center gap-2 hover:text-white">
											<AiFillHeart className="" /> <p>My Articles</p>
										</a>
									</Link>
									<Link href="/dashboard/settings" className="cursor-pointer">
										<a className="flex items-center gap-2 w-full hover:text-white">
											<FaCog className="" />
											<p> Settings</p>
										</a>
									</Link>

									<li
										className="flex items-center gap-2 hover:text-white"
										onClick={signOut}
									>
										<IoLogOut className="text-xl" />
										Logout
									</li>
								</ul>
							)}
							<p>{session.user.firstName}</p>
							{session.user.image && (
								<img
									className="w-8 h-8 rounded-full"
									src={session.user.image}
									alt=""
								/>
							)}
							{isDropDownOpen ? (
								<AiOutlineCaretUp className="text-sm" />
							) : (
								<AiOutlineCaretDown className="text-sm" />
							)}
						</li>
					) : null
					// <li
					// 	onClick={signIn}
					// 	className="cursor-pointer hover:text-gray-500 duration-200"
					// >
					// 	LOGIN
					// </li>
				}
			</ul>
		</nav>
	);
};

export default MainNav;
