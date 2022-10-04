import React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';

const Layout = ({ children }) => {
	return (
		<>
			<div className="min-h-screen max-w-[1600px] mx-auto pb-8 w-[90%]">
				<Header />
				<main className="min-h-full">{children}</main>
			</div>
			<Footer />
		</>
	);
};

export default Layout;
