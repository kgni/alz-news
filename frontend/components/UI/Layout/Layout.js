import React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen max-w-[1600px] mx-auto">
			<Header />
			<main className="min-h-full">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
