import React, { useState } from 'react';

import { useSession, signOut } from 'next-auth/react';

import { FaUser, FaCog } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import {
	AiOutlineCaretDown,
	AiOutlineCaretUp,
	AiFillHeart,
} from 'react-icons/ai';
import Link from 'next/link';

const ProfileItem = () => {
	const { data: session, status } = useSession();
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
		<ul className="flex gap-x-8 items-center font-bold">
			{
				session ? (
					<li
						onClick={() => setIsDropDownOpen((prev) => !prev)}
						className={`cursor-pointer duration-200 flex items-center gap-2 relative ${
							isDropDownOpen ? '' : ''
						}`}
					>
						{isDropDownOpen && (
							<ul className="bg-black text-gray-400 p-8 rounded-md absolute  top-10 right-0 shadow-md flex flex-col z-50 gap-4 w-52 items-start select-none">
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
						<p className="select-none">{session.user.firstName}</p>
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
	);
};

export default ProfileItem;
