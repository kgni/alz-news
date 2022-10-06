import InfoPageLayout from '../../components/UI/Layout/InfoPageLayout';
import Head from 'next/head';
export default function Page({}) {
	return (
		<>
			<Head>
				<title>Alzheimers - What Is Alzheimers?</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>Hello!</div>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return <InfoPageLayout>{page}</InfoPageLayout>;
};
