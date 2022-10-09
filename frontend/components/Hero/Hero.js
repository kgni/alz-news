import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleImage, {
	ParticleOptions,
	Vector,
	forces,
	ParticleForce,
} from 'react-particle-image';
import useMediaQuery from '../../hooks/useMediaQuery';
import useWindowSize from '../../hooks/useWindowSize';
// import './styles.css';

// Round number up to nearest step for better canvas performance
const round = (n, step = 20) => Math.ceil(n / step) * step;

// Try making me lower to see how performance degrades
const STEP = 60;

const particleOptions = {
	filter: ({ x, y, image }) => {
		// Get pixel
		const pixel = image.get(x, y);
		// Make a particle for this pixel if magnitude < 200 (range 0-255)
		const magnitude = (pixel.r + pixel.g + pixel.b) / 50;
		return magnitude < 200;
	},
	color: ({ x, y, image }) => {
		const pixel = image.get(x, y);
		// Canvases are much more performant when painting as few colors as possible.
		// Use color of pixel as color for particle however round to nearest 30
		// to decrease the number of unique colors painted on the canvas.
		// You'll notice if we remove this rounding, the framerate will slow down a lot.
		return `rgba(
      ${round(pixel.r, STEP)}, 
      ${round(pixel.g, STEP)}, 
      ${round(pixel.b, STEP)}, 
      ${round(pixel.a, STEP) / 255}
    )`;
	},
	radius: ({ x, y, image }) => {
		const pixel = image.get(x, y);
		const magnitude = (pixel.r + pixel.g + pixel.b) / 60;
		// Lighter colors will have smaller radius
		return 12 - (magnitude / 255) * 1.5;
	},
	mass: () => 40,
	friction: () => 0.5,
	initialPosition: ({ canvasDimensions }) => {
		return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
	},
};

const particleOptionsSmall = {
	filter: ({ x, y, image }) => {
		// Get pixel
		const pixel = image.get(x, y);
		// Make a particle for this pixel if magnitude < 200 (range 0-255)
		const magnitude = (pixel.r + pixel.g + pixel.b) / 50;
		return magnitude < 200;
	},
	color: ({ x, y, image }) => {
		const pixel = image.get(x, y);
		// Canvases are much more performant when painting as few colors as possible.
		// Use color of pixel as color for particle however round to nearest 30
		// to decrease the number of unique colors painted on the canvas.
		// You'll notice if we remove this rounding, the framerate will slow down a lot.
		return `rgba(
      ${round(pixel.r, STEP)}, 
      ${round(pixel.g, STEP)}, 
      ${round(pixel.b, STEP)}, 
      ${round(pixel.a, STEP) / 255}
    )`;
	},
	radius: ({ x, y, image }) => {
		const pixel = image.get(x, y);
		const magnitude = (pixel.r + pixel.g + pixel.b) / 60;
		// Lighter colors will have smaller radius
		return 2 - (magnitude / 255) * 1.5;
	},
	mass: () => 40,
	friction: () => 0.5,
	initialPosition: ({ canvasDimensions }) => {
		return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
	},
};

const motionForce = (x, y) => {
	return forces.disturbance(x, y, 7);
};

const Hero = () => {
	const is16By9 = useMediaQuery('(min-aspect-ratio: 16/9)');

	const isDesktop = useMediaQuery('(min-width: 1220px)');
	const isTwelveHundred = useMediaQuery('(max-width: 1220px)');
	const isElevenHundred = useMediaQuery('(max-width: 1150px)');
	const isNineHundred = useMediaQuery('(max-width: 900px)');
	const isSevenHundred = useMediaQuery('(max-width: 767px)');

	const { width, height } = useWindowSize();
	return (
		<main className=" relative mx-auto news-section w-full flex items-center grow md:justify-center md:items-start">
			<h1 className="w-1/2 text-9xl font-bold tracking-wide leading-[1.20] -mt-32 relative lg:text-8xl md:w-full md:text-center md:mt-24 md:text-7xl md:tracking-widest md:leading-relaxed sm:hidden">
				THE HEART NEVER FORGETS
			</h1>
			{!isSevenHundred ? (
				<ParticleImage
					className={`absolute -z-20 top- -right-[30%] max-h-full h-auto ${
						isTwelveHundred && '-right-[40%]'
					} ${isElevenHundred && '-right-[57%]'} ${
						isNineHundred && 'right-0'
					} ${isSevenHundred && '-bottom-[30%] right-[7%]'}`}
					src={'/img/brain06-nobg.png'}
					width={width}
					height={height + 150}
					scale={0.35}
					entropy={20}
					maxParticles={4000}
					particleOptions={particleOptions}
					backgroundColor="transparent"
					creationDuration={5000}
				/>
			) : (
				<ParticleImage
					className="absolute -top-[7%] -z-20"
					src={'/img/brain06-nobg.png'}
					width={width}
					height={height}
					scale={0.15}
					entropy={20}
					maxParticles={4000}
					particleOptions={particleOptionsSmall}
					backgroundColor="transparent"
					creationDuration={3000}
				/>
			)}
		</main>
	);
};

export default Hero;
