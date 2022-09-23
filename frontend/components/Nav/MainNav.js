import React from 'react';
import Link from 'next/link';

const MainNav = () => {
	return (
		<nav className="w-[90%] mx-auto py-4 flex justify-between items-center">
			<Link href="/">
				<span className="uppercase font-bold text-3xl cursor-pointer">
					Alz<span>.</span>
					<span className="text-xl">news</span>
				</span>
			</Link>
			<ul className="flex gap-x-8 font-semibold">
				<Link href="/">
					<li className="cursor-pointer hover:text-gray-500 duration-200">
						NEWS
					</li>
				</Link>
				<Link href="/login">
					<li className="cursor-pointer hover:text-gray-500 duration-200">
						LOGIN
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default MainNav;
