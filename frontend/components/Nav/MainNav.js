import React from 'react';
import Link from 'next/link';

const MainNav = () => {
	return (
		<nav className="w-[90%] mx-auto py-4 flex justify-between items-center">
			<Link href="/">
				<span className="uppercase font-bold text-3xl cursor-pointer">
					Alz.<span className="text-xl">news</span>
				</span>
			</Link>
			<ul className="flex gap-x-8 font-semibold">
				<Link href="/">
					<li className="cursor-pointer">HOME</li>
				</Link>
				<Link href="/news">
					<li className="cursor-pointer">NEWS</li>
				</Link>
				<Link href="/journals">
					<li className="cursor-pointer">JOURNALS</li>
				</Link>
			</ul>
		</nav>
	);
};

export default MainNav;
