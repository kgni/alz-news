import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Router from 'next/router';
import { motion } from 'framer-motion';

import Loader from '../components/Loader';
export default function App({
	Component,
	pageProps: { session, ...pageProps },
	router,
}) {
	const [isLoading, setIsLoading] = useState(true);

	Router.events.on('routeChangeStart', (url) => {
		setIsLoading(true);
	});

	Router.events.on('routeChangeComplete', (url) => {
		setIsLoading(false);
	});

	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('load', setIsLoading(false));
		}, 500);
	}, []);

	const getLayout = Component.getLayout || ((page) => page);

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && (
				<SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
					<motion.div
						key={router.route}
						initial="pageInitial"
						animate="pageAnimate"
						variants={{
							pageInitial: {
								opacity: 0,
							},
							pageAnimate: {
								opacity: 1,
							},
						}}
					>
						{getLayout(<Component {...pageProps} />)}
					</motion.div>
				</SessionProvider>
			)}
		</>
	);
}
