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
			tagStyle = 'bg-[#052962] text-white';
			cardBgStyle = 'bg-blue-50 hover:bg-blue-100';
			break;
		case 'alz.org':
			tagStyle = 'bg-purple-300 text-black';
			cardBgStyle = 'bg-purple-50 hover:bg-purple-100';
			break;
		case 'Neuroscience News':
			tagStyle = 'bg-gray-300';
			cardBgStyle = 'bg-yellow-50 hover:bg-yellow-100';
			break;

		case 'j-alz.com':
			tagStyle = 'bg-green-500 text-black';
			cardBgStyle = 'bg-green-50 hover:bg-green-100';
			break;
		case 'alzheimers.org.uk':
			tagStyle = 'bg-cyan-800 text-white';
			cardBgStyle = 'bg-cyan-50 hover:bg-cyan-100';
			break;

		case 'nia.gov':
			tagStyle = 'bg-yellow-300 text-black';
			cardBgStyle = 'bg-red-50 hover:bg-red-100';
			break;
	}

	return (
		<>
			{' '}
			<Link target="_blank" href={article.url}>
				<article
					className={`flex flex-col px-4 py-3 shadow-lg bg-white mb-2  border-black hover:bg-gray-200  cursor-pointer rounded-md`}
				>
					<div
						className={`flex text-sm items-center  mb-2 rounded-full gap-2 `}
					>
						<img
							className="w-6 aspect-auto"
							src={`/img/newsSitesFavicons/${article.publisher[0]}.png`}
							alt=""
						/>
						<p className={`font-semibold text-xs rounded-full}`}>
							{article.publisher[0]}
						</p>
					</div>
					<div className="mb-4">
						<a className="" target="_blank" href={article.url}>
							<h4 className="text-lg mb-2 font-bold">{article.title}</h4>
						</a>
						<h6 className="">{article.subtitle}</h6>
					</div>

					<div className="flex items-center gap-x-2 mt-auto">
						<time className="font-semibold text-sm">{publishDate}</time>
					</div>
				</article>
			</Link>
			<div className="mb-2 h-[1px] bg-black w-full"></div>
		</>
	);
};

export default NewsArticle;
