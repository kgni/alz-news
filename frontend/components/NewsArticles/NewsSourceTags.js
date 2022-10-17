import React from 'react';

const NewsSourceTags = ({ newsSource, onClickRemoveNewsSource }) => {
	return (
		<>
			<ul
				className={`flex gap-2 flex-wrap select-none ${
					newsSource.length > 0 ? 'mb-2' : ''
				} `}
			>
				{newsSource.map((source) => {
					let tagStyle;

					switch (source) {
						case 'The Guardian':
							tagStyle =
								'bg-[#052962] text-white hover:bg-[#0948AD] duration-100';
							break;
						case 'alz.org':
							tagStyle =
								'bg-purple-400 text-black hover:bg-purple-300 duration-100';
							break;
						case 'Neuroscience News':
							tagStyle = 'bg-gray-300 hover:bg-gray-200 duration-100';
							break;

						case 'j-alz.com':
							tagStyle =
								'bg-green-800 text-white hover:bg-green-700 duration-150';
							break;
						case 'alzheimers.org.uk':
							tagStyle =
								'bg-cyan-800 text-white hover:bg-cyan-700 duration-150';
							break;

						case 'nia.gov':
							tagStyle = 'bg-red-800 text-white hover:bg-red-700 duration-100';
							break;
					}
					return (
						<li
							key={source}
							onClick={onClickRemoveNewsSource}
							className={`${tagStyle} rounded-full text-xs px-4 py-1 cursor-pointer font-semibold`}
						>
							{source}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default NewsSourceTags;
