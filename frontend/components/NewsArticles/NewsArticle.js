import React from 'react';
import format from 'date-fns/format';
import { motion } from 'framer-motion';

const NewsArticle = ({ article }) => {
	const publishDate = format(new Date(article.publishDate), 'PPP');

	// create publisher tag:
	let tagStyle;
	let cardBgStyle;

	switch (article.publisher[0]) {
		case 'The Guardian':
			tagStyle = 'bg-blue-800 text-white';
			cardBgStyle = 'bg-blue-50';
			break;
		case 'alz.org':
			tagStyle = 'bg-purple-800 text-white';
			cardBgStyle = 'bg-purple-50';
			break;
		case 'Neuroscience News':
			tagStyle = 'bg-yellow-400 text-black';
			cardBgStyle = 'bg-yellow-50';
			break;

		case "Journal Of Alzheimer's Disease":
			tagStyle = 'bg-green-800 text-white';
			cardBgStyle = 'bg-green-50';
			break;
		case 'alzheimers.org.uk':
			tagStyle = 'bg-cyan-800 text-white';
			cardBgStyle = 'bg-cyan-50';
			break;

		case 'National Institute on Aging':
			tagStyle = 'bg-red-800 text-white';
			cardBgStyle = 'bg-red-50';
			break;
	}

	return (
		<motion.a
			// whileHover={{ scale: 1.01 }}
			className={`p-4 shadow-md flex  ${cardBgStyle} bg-white`}
			target="_blank"
			href={article.url}
		>
			<article className="flex flex-col">
				<div className="mb-4">
					<a className="hover:underline" target="_blank" href={article.url}>
						<h4 className="text-2xl mb-2 font-bold">{article.title}</h4>
					</a>
					<h6>{article.subtitle}</h6>
				</div>

				<div className="flex items-center gap-x-4 mt-auto">
					<p className="font-semibold">{publishDate}</p>
					<motion.a
						whileHover={{ scale: 1.02 }}
						className=""
						href={article.publisherUrl}
					>
						<p className={`${tagStyle} text-sm px-2 rounded-full`}>
							{article.publisher[0]}
						</p>
					</motion.a>
				</div>
			</article>
		</motion.a>
	);
};

export default NewsArticle;
