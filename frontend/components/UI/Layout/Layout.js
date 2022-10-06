import React from 'react';
import Footer from '../../Nav/Footer';
import Header from '../../Nav/Header';

const Layout = ({ children }) => {
	return (
		<>
			<div className="overflow-x-hidden min-h-screen flex flex-col">
				<div className="grow max-w-[1600px] mx-auto pb-8 w-[90%]">
					<Header />
					{children}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
