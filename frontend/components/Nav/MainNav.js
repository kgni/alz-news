import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';

import { FaUser } from 'react-icons/fa';
import { AiOutlineCaretDown } from 'react-icons/ai';

const MainNav = () => {
	const { data: session, loading } = useSession();
	console.log(session);
	return (
		<nav className="w-[90%] mx-auto py-4 flex justify-between items-center text-white">
			<Link href="/">
				<span className="uppercase font-bold text-3xl cursor-pointer">
					Alz<span>.</span>
					<span className="text-xl">news</span>
				</span>
			</Link>
			{/* <ul className="flex gap-x-8 font-semibold items-center">
				<Link href="/">
					<li className="cursor-pointer hover:text-gray-300 duration-200">
						NEWS
					</li>
				</Link>
			</ul> */}
			<ul className="flex gap-x-8 font-semibold items-center">
				{session ? (
					<li
						onClick={signOut}
						className="cursor-pointer hover:text-gray-300 duration-200 flex items-center gap-2"
					>
						{session.user.image ? (
							<img
								className="w-8 h-8 rounded-full"
								src={session.user.image}
								alt=""
							/>
						) : (
							<FaUser className="w-6 h-6" />
						)}
						{/* <AiOutlineCaretDown /> */}
					</li>
				) : (
					<li
						onClick={signIn}
						className="cursor-pointer hover:text-gray-500 duration-200"
					>
						LOGIN
					</li>
				)}
			</ul>
		</nav>
	);
};

export default MainNav;
