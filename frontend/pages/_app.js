import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Router from 'next/router';

import Loader from '../components/Loader';
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		window.addEventListener('load', () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		});
	}, []);

	Router.events.on('routeChangeStart', (url) => {
		setIsLoading(true);
	});
	Router.events.on('routeChangeComplete', (url) => {
		setIsLoading(false);
	});

	const getLayout = Component.getLayout || ((page) => page);

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && (
				<SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
					{getLayout(<Component {...pageProps} />)}
				</SessionProvider>
			)}
		</>
	);
}
