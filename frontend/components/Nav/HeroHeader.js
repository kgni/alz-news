import React from 'react';
import HeroNav from './HeroNav';
import MobileNav from './MobileNav';

import useMediaQuery from '../../hooks/useMediaQuery';

const HeroHeader = () => {
	const isDesktop = useMediaQuery('(min-width: 900px)');
	return (
		<header className="grow max-w-[1600px] mx-auto pb-8 w-[90%]">
			{isDesktop ? <HeroNav /> : <MobileNav />}
		</header>
	);
};

export default HeroHeader;
