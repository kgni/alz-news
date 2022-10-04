import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<section className=" relative mx-auto news-section min-h-screen w-full flex items-center">
			<h1 className="w-1/2 -mt-80 text-9xl font-bold tracking-wide leading-[1.20]">
				THE HEART NEVER FORGETS
			</h1>
			<motion.img
				className="absolute top-8 -right-48"
				animate={{ y: 25 }}
				transition={{
					duration: 10,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				src="/img/hero-img.png"
				alt=""
			/>
		</section>
	);
};

export default Hero;
