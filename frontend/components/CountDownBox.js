import React from 'react';

const CountDownBox = ({ number, title }) => {
	return (
		<div className="w-full flex justify-center bg-[#f1f2f2] py-8 relative mb-8">
			<span className="absolute -top-7 w-14 h-10 rounded-lg flex items-center justify-center bg-black text-white font-bold">
				{number}
			</span>
			<h2 className="text-3xl font-bold">{title}</h2>
		</div>
	);
};

export default CountDownBox;
