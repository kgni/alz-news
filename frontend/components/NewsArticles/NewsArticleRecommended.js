import React from 'react';
import format from 'date-fns/format';
import { motion } from 'framer-motion';

const NewsArticle = ({ article }) => {
	const publishDate = format(new Date(article.publishDate), 'MMMMPP');

	// create publisher tag:
	let tagStyle;
	let cardBgStyle;

	switch (article.publisher[0]) {
		case 'The Guardian':
			tagStyle = 'bg-blue-800 text-white';
			cardBgStyle = 'bg-blue-50 hover:bg-blue-100';
			break;
		case 'alz.org':
			tagStyle = 'bg-purple-800 text-white';
			cardBgStyle = 'bg-purple-50 hover:bg-purple-100';
			break;
		case 'Neuroscience News':
			tagStyle = 'bg-yellow-400 text-black';
			cardBgStyle = 'bg-yellow-50 hover:bg-yellow-100';
			break;

		case 'j-alz.com':
			tagStyle = 'bg-green-800 text-white';
			cardBgStyle = 'bg-green-50 hover:bg-green-100';
			break;
		case 'alzheimers.org.uk':
			tagStyle = 'bg-cyan-800 text-white';
			cardBgStyle = 'bg-cyan-50 hover:bg-cyan-100';
			break;

		case 'nia.gov':
			tagStyle = 'bg-red-800 text-white';
			cardBgStyle = 'bg-red-50 hover:bg-red-100';
			break;
	}

	return (
		<a
			// whileHover={{ scale: 1.01 }}
			className={`${cardBgStyle} p-4 shadow-md flex bg-white mb-4 rounded-md`}
			target="_blank"
			href={article.url}
		>
			<article className={` flex flex-col`}>
				<div className="mb-4">
					<a className="" target="_blank" href={article.url}>
						<h4 className="text-md mb-2 font-bold">{article.title}</h4>
					</a>
					{/* <h6 className="text-sm">{article.subtitle}</h6> */}
				</div>

				<div className="flex items-center gap-x-4 mt-auto">
					<p className="font-semibold">{publishDate}</p>
					<a
						whileHover={{ scale: 1.02 }}
						className=""
						href={article.publisherUrl}
						target="_blank"
					>
						<p className={`${tagStyle} text-sm px-2 rounded-full`}>
							{article.publisher[0]}
						</p>
					</a>
				</div>
			</article>
		</a>
	);
};

export default NewsArticle;
