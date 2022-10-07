import React from 'react';

const TopicCard = ({ title, img, link, alt = '' }) => {
	return (
		<div className="shadow-xl rounded-md hover:underline cursor-pointer ring-1 ring-black ring-opacity-10">
			<a className="" href={link} target="_blank">
				<img
					className="object-cover w-full h-52 rounded-t-md"
					src={img}
					alt={alt}
				/>
				<h3 className="text-center text-xl hover:text-gray-600 font-bold p-4 ">
					{title}
				</h3>
			</a>
		</div>
	);
};

export default TopicCard;
