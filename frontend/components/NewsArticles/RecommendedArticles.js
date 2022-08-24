import React from 'react';
import favoriteArticleData from '../../favoriteArticleData';
const RecommendedArticles = ({ className }) => {
	let tagStyle;
	let cardBgStyle;

	return (
		<div className={`${className} w-1/3`}>
			<h2 className="text-3xl font-bold mb-4">Recommended Articles</h2>
			{favoriteArticleData.map((article) => {
				switch (article.publisher) {
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
					<a href="/news">
						<div className="mb-8 shadow-md p-4">
							<h3 className="mb-2 font-bold">{article.title}</h3>
							<p className="mb-6">{article.subtitle}</p>
							<div className="flex gap-4">
								<p className="font-bold">{article.publishDate}</p>
								<p className={`${tagStyle} text-sm px-2 rounded-full`}>
									{article.publisher}
								</p>
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
};

export default RecommendedArticles;
