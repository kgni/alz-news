import Head from 'next/head';
import axios from 'axios';
import Script from 'next/script';
// COMPONENTS

import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Footer from '../components/Nav/Footer';
import HeroHeader from '../components/Nav/HeroHeader';
import useMediaQuery from '../hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useWindowSize from '../hooks/useWindowSize';

const NextParticle = dynamic(() => import('../components/NextParticle'), {
	ssr: false,
});

export default function HomePage() {
	const is16By9 = useMediaQuery('(min-aspect-ratio: 16/9)');
	const windowSize = useWindowSize();

	const isSmallerDevices = useMediaQuery('(max-width: 1445px)');
	const isMobile = useMediaQuery('(max-width: 639px');
	console.log(isMobile);

	const [settings, setSettings] = useState(null);
	useEffect(() => {
		setSettings({
			renderer: 'webgl',
			colorArr: undefined,
			imageUrl: '/img/brain06-nobgsmall.png',
			particleGap: 2,
			gravity: 0.08,
			noise: 3,
			width: windowSize.width,
			height: isMobile ? '50%' : '100%',
			maxWidth: isMobile ? '30%' : '100%',
			maxHeight: isMobile ? '100%' : 400,
			mouseForce: 8,
			clickStrength: 0,
			particleSize: 4,
			layerCount: 1,
			layerDistance: 1,
			depth: 1,
			lifeCycle: true,
			growDuration: 50,
			waitDuration: 100,
			shrinkDuration: 50,
			shrinkDistance: 2,
			disableInteraction: true,
		});
	}, [isMobile, windowSize]);
	return (
		<>
			<Head>
				<title>ALZH.INFO</title>
				<meta
					name="description"
					content="Alzh.info - Alzheimer's and Dementia information"
				/>
				<meta property="og:url" content="https://www.alzh.info/" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Easy access to Alzheimer's and Dementia research"
				/>
				<meta name="twitter:card" content="summary" />
				<meta
					property="og:description"
					content="Alzh.info is a simple, easy-to-use, non-profit platform for anyone who has an interest in Alzheimer's or Dementia.
					The purpose is to make resources including articles, journals, practical information and all kinds of knowledge, easily accessible by gathering it all in one place."
				/>
				<meta
					property="og:image"
					content="https://user-images.githubusercontent.com/84397151/195405928-5f765e9c-c4fd-470d-98fc-df110c89cd17.png"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className=" mx-auto overflow-hidden">
				<div className="absolute top-[10%] -z-10 w-full h-screen bg-gradient-to-t from-white  to-transparent"></div>

				<div className="min-h-screen max-h-screen flex flex-col">
					<HeroHeader />
					{/* <Hero /> */}

					<main className="md:pt-0 grow overflow-hidden">
						{settings && (
							<NextParticle
								{...settings}
								className={`w-full max-h-full text-center flex-col pt-12 -z-20 overflow-hidden -right-8 md:right-0 justify-start relative`}
							/>
						)}
					</main>
				</div>
				<About />
			</div>

			<Footer />
		</>
	);
}
