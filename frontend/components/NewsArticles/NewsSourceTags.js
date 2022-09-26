import React from 'react';

const NewsSourceTags = ({ newsSource, onClickRemoveNewsSource }) => {
	return (
		<>
			<ul className="absolute left-[350px] top-[45px] flex gap-2 flex-wrap">
				{newsSource.map((source) => {
					let tagStyle;

					switch (source) {
						case 'The Guardian':
							tagStyle =
								'bg-blue-800 text-white hover:bg-blue-700 duration-150';
							break;
						case 'alz.org':
							tagStyle =
								'bg-purple-800 text-white hover:bg-purple-700 duration-150';
							break;
						case 'Neuroscience News':
							tagStyle =
								'bg-yellow-400 text-black hover:bg-yellow-300 duration-150';
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
							tagStyle = 'bg-red-800 text-white hover:bg-red-700 duration-150';
							break;
					}
					return (
						<li
							onClick={onClickRemoveNewsSource}
							className={`${tagStyle} rounded-full text-xs px-4 py-1 cursor-pointer`}
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
