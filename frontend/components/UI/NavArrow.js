import React from 'react';

const NavArrow = ({ className }) => {
	return (
		<div
			className={`ARROW-UP absolute ${className} translate-x-1/2 border-l-8 border-r-8  border-b-8 border-l-transparent border-r-transparent  border-b-black`}
		></div>
	);
};

export default NavArrow;
