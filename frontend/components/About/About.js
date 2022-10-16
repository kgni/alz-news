import React from 'react';
import ParticleImage, {
	ParticleOptions,
	Vector,
	forces,
	ParticleForce,
} from 'react-particle-image';
import useMediaQuery from '../../hooks/useMediaQuery';
// import './styles.css';

// Round number up to nearest step for better canvas performance
const round = (n, step = 20) => Math.ceil(n / step) * step;

// Try making me lower to see how performance degrades
const STEP = 30;

const particleOptions = {
	filter: ({ x, y, image }) => {
		// Get pixel
		const pixel = image.get(x, y);
		// Make a particle for this pixel if magnitude < 200 (range 0-255)
		const magnitude = (pixel.r + pixel.g + pixel.b) / 20;
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
		const magnitude = (pixel.r + pixel.g + pixel.b) / 50;
		// Lighter colors will have smaller radius
		return 2 - (magnitude / 255) * 1.5;
	},
	mass: () => 40,
	friction: () => 0.5,
	initialPosition: ({ canvasDimensions }) => {
		return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
	},
};

const About = () => {
	const isDesktop = useMediaQuery('(max-width: 900px)');
	return (
		<div className="flex items-center justify-between gap-36 xl:gap-14 py-12 max-w-[1600px] mx-auto w-[90%]">
			{!isDesktop && (
				<ParticleImage
					className="w-1/2"
					src={'/img/synapse01.png'}
					scale={0.35}
					entropy={20}
					maxParticles={1000}
					particleOptions={particleOptions}
					backgroundColor="transparent"
				/>
			)}

			<div className={`w-full`}>
				<h2 className="text-6xl font-semibold mb-12 xl:text-center ">
					What Is Alzh.info?
				</h2>
				<div className="leading-loose flex flex-col gap-4 w-">
					<p>
						Alzh.info is a simple, <em className="font-bold">easy-to-use</em>,
						non-profit platform for anyone who has an interest in Alzheimer's or
						Dementia. <br />
						The purpose is to make resources including articles, journals,
						practical information and all kinds of knowledge, easily accessible
						by gathering it all in one place.
					</p>
					<p>
						Alzh.info is not affiliated with any Alzheimer's organizations or
						patients advocacy groups in any way.
					</p>
					<div>
						<p className="inline">
							If you have any relevant information or suggestions for content or
							improvements, <br /> please contact us at{' '}
						</p>
						<address className="inline font-bold">mail@alzh.info</address>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
