import React from 'react';
import NewsArticleRecommended from './NewsArticleRecommended';
const RecommendedArticles = ({ className, articles }) => {
	let tagStyle;
	let cardBgStyle;

	const recommendedArticles = articles.filter((article) => article.recommended);

	return (
		<div className={`${className} px-8 pt-4 pb-2`}>
			<h2 className="text-3xl font-bold mb-4">Recommended Articles</h2>
			{recommendedArticles.length === 0 && (
				<p>No recommended articles found..</p>
			)}
			{recommendedArticles.length > 0 &&
				recommendedArticles
					.map((article) => {
						return <NewsArticleRecommended article={article} />;
					})
					.slice(0, 5)}
		</div>
	);
};

export default RecommendedArticles;
