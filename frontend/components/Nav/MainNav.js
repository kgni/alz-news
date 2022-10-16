import React from 'react';
import Link from 'next/link';

import MenuItems from './MenuItems';
import ProfileItem from './ProfileItem';

const MainNav = () => {
	return (
		<nav className="mx-auto py-8 flex justify-between items-center text-black border-b-2 border-black">
			<Link href="/">
				<span className="uppercase font-bold text-2xl cursor-pointer select-none">
					Alzh<span>.</span>
					<span className="text-xl">info</span>
				</span>
			</Link>
			<MenuItems />
			<ProfileItem />
		</nav>
	);
};

export default MainNav;
