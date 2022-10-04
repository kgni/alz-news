import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<main className=" relative mx-auto news-section w-full flex items-center grow">
			<h1 className="w-1/2 text-9xl font-bold tracking-wide leading-[1.20] -mt-32">
				THE HEART NEVER FORGETS
			</h1>
			<motion.img
				className="absolute top-8 -right-40 -z-10 w-[900px]"
				animate={{ y: 25 }}
				transition={{
					duration: 15,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				src="/img/hero-img.png"
				alt=""
			/>
		</main>
	);
};

export default Hero;
