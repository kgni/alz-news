import React from 'react';
import Link from 'next/link';

import MenuItems from './MenuItems';
import ProfileItem from './ProfileItem';

const HeroNav = () => {
	return (
		<nav className="relative z-50 mx-auto py-8 flex justify-between items-center text-black border-b-2 border-black md:w-[90%]">
			<Link href="/">
				<span className="uppercase font-bold text-2xl cursor-pointer select-none">
					Alz<span>.</span>
					<span className="text-xl">news</span>
				</span>
			</Link>
			<MenuItems />
			<ProfileItem />
		</nav>
	);
};

export default HeroNav;
