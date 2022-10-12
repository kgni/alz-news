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

const NextParticle = dynamic(() => import('../components/NextParticle'), {
	ssr: false,
});

export default function HomePage() {
	const is16By9 = useMediaQuery('(min-aspect-ratio: 16/9)');

	const isSmallerDevices = useMediaQuery('(max-width: 1445px)');

	const [settings, setSettings] = useState(null);
	useEffect(() => {
		setSettings({
			renderer: 'webgl',
			colorArr: undefined,
			imageUrl: '/img/brain06-nobgsmall.png',
			particleGap: 3,
			gravity: 0.08,
			noise: 3,
			width: '100%',
			height: '100%',
			maxWidth: '100%',
			maxHeight: '32%',
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
	}, []);
	return (
		<>
			<Head>
				<title>ALZH.INFO</title>
				<meta
					name="description"
					content="Alzh.info - Alzheimer's and dementia information"
				/>
				<meta property="og:url" content="https://www.alzh.info/" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Easy access to Alzheimer's and dementia research"
				/>
				<meta name="twitter:card" content="summary" />
				<meta
					property="og:description"
					content="Alzh.info is a simple, easy-to-use, non-profit platform for anyone who has an interest in Alzheimer's or Dementia.
					The purpose is to make resources including articles, journals, practical information and all kinds of knowledge, easily accessible by gathering it all in one place."
				/>
				<meta
					property="og:image"
					content="https://user-images.githubusercontent.com/84397151/195356267-0c414ae2-846b-4948-a4cd-1cd6c80484a9.png"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* this is just to fix the image from overflowing */}
			<div className=" relative max-w-[1600px] mx-auto overflow-hidden">
				{settings && (
					<NextParticle
						{...settings}
						className={`absolute top-20 -z-20 right-0 overflow-hidden xl:max-h-screen ${
							isSmallerDevices && '-right-[5%] translate-x-[50%] max-w[1600px]'
						} md:right-[50%]`}
					/>
				)}
				<div className="absolute top-[15%] -z-10 w-full h-screen bg-gradient-to-t from-white  to-transparent"></div>
				<div className="">
					<div className="min-h-screen flex flex-col">
						<HeroHeader />
						<Hero />
					</div>
					<About />
				</div>
			</div>
			<Footer />
		</>
	);
}
