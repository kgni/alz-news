import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
			{getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
}
