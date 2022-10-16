import React from 'react';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-black text-white">
			<div className="max-w-[1600px] py-8 w-[90%] mx-auto flex items-center justify-center">
				<h6 className="font-bold">alzh.info &#169; {currentYear}</h6>
			</div>
		</footer>
	);
};

export default Footer;
