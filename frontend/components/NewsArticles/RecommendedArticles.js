import React from 'react';
import NewsArticleRecommended from './NewsArticleRecommended';
const RecommendedArticles = ({ className, articles }) => {
	let tagStyle;
	let cardBgStyle;

	return (
		<div className={`${className} px-4 pt-4 pb-2`}>
			<h2 className="text-xl text-center font-bold mb-4">
				Recommended Articles
			</h2>
			{articles.length === 0 && <p>No recommended articles found..</p>}
			{articles.length > 0 &&
				articles
					.map((article) => {
						return (
							<NewsArticleRecommended key={article.id} article={article} />
						);
					})
					.slice(0, 5)}
		</div>
	);
};

export default RecommendedArticles;
