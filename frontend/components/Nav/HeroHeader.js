import React from 'react';
import HeroNav from './HeroNav';
import MobileNav from './MobileNav';

import useMediaQuery from '../../hooks/useMediaQuery';

const HeroHeader = () => {
	const isDesktop = useMediaQuery('(min-width: 900px)');
	return (
		<header className="relative mx-auto max-w-[1600px] w-[90%]">
			{isDesktop ? <HeroNav /> : <MobileNav />}
		</header>
	);
};

export default HeroHeader;
