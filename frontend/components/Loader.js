import React from 'react';
import { motion } from 'framer-motion';
const Loader = () => {
	return (
		<motion.div className="w-screen h-screen flex justify-center items-center select-none py-8">
			<div className="-mt-44">
				<span className=" animate text-4xl uppercase font-bold cursor-pointer select-none">
					Alzh<span>.</span>
					<span className="text-xl self-end">info</span>
				</span>
			</div>
		</motion.div>
	);
};

export default Loader;
