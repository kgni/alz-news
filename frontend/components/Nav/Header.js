import React from 'react';
import MainNav from './MainNav';
import MobileNav from './MobileNav';

import useMediaQuery from '../../hooks/useMediaQuery';

const Header = () => {
	const isDesktop = useMediaQuery('(min-width: 900px)');
	return (
		<header className="">{isDesktop ? <MainNav /> : <MobileNav />}</header>
	);
};

export default Header;
