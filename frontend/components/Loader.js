import React from 'react';
import { motion } from 'framer-motion';
const Loader = () => {
	return (
		<motion.div
			// initial="hidden"
			// animate="visible"
			// variants={{
			// 	hidden: {
			// 		scale: 0.8,
			// 		opacity: 0,
			// 	},
			// 	visible: {
			// 		scale: 1,
			// 		opacity: 1,
			// 		transition: {
			// 			delay: 0.4,
			// 		},
			// 	},
			// }}
			className="w-screen h-screen flex justify-center items-center select-none"
		>
			<h1 className="text-9xl font-bold">ALZ.news</h1>
		</motion.div>
	);
};

export default Loader;
