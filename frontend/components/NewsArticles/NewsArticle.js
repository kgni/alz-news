import React from 'react';
import format from 'date-fns/format';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NewsArticle = ({ article }) => {
	const publishDate = format(new Date(article.publishDate), 'MMMMPP');

	// create publisher tag:
	let tagStyle;
	let cardBgStyle;

	switch (article.publisher[0]) {
		case 'The Guardian':
			tagStyle = 'ring-2 ring-blue-800';
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
		<Link target="_blank" href={article.url}>
			<article
				className={`flex flex-col p-4 shadow-md bg-white mb-4 ${cardBgStyle} cursor-pointer rounded-md`}
			>
				<div className="mb-4">
					<a className="" target="_blank" href={article.url}>
						<h4 className="text-xl mb-2 font-bold">{article.title}</h4>
					</a>
					<h6 className="">{article.subtitle}</h6>
				</div>

				<div className="flex items-center gap-x-2 mt-auto">
					<time className="font-semibold text-sm">{publishDate}</time>
					<a className="" href={article.publisherUrl} target="_blank">
						<div
							className={`flex text-sm py-1 px-3 rounded-full gap-2 items-center `}
						>
							<img
								className="w-5"
								src={`/img/newsSitesFavicons/${article.publisher[0]}.png`}
								alt=""
							/>
							<p className="font-bold">{article.publisher[0]}</p>
						</div>
					</a>
				</div>
			</article>
		</Link>
	);
};

export default NewsArticle;
