import React from 'react';
import format from 'date-fns/format';

const SearchResults = ({ article, index }) => {
	const publishDate = format(new Date(article.publishDate), 'PPP');
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
		<article className="flex flex-col">
			<div className="px-2 py-1 shadow-md mb-2 bg-white">
				<a
					className="mb-2 block hover:underline font-bold"
					target="_blank"
					href={article.url}
				>
					{article.title}
				</a>
				<div className="flex items-center justify-between gap-x-2 mb-2 mt-auto">
					<time className=" text-xs">{publishDate}</time>
					<p className={`${tagStyle} rounded-full px-2 py-1 text-xs`}>
						{article.publisher[0]}
					</p>
				</div>
			</div>
		</article>
	);
};

export default SearchResults;
