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
			className="w-screen h-screen flex justify-center items-center select-none py-8"
		>
			<div>
				<span className=" animate text-4xl uppercase font-bold cursor-pointer select-none">
					Alz<span>.</span>
					<span className="text-xl self-end">news</span>
				</span>
			</div>
		</motion.div>
	);
};

export default Loader;
