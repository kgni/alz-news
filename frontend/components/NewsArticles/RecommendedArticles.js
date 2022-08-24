import React from 'react';
import favoriteArticleData from '../../favoriteArticleData';
const RecommendedArticles = ({ className }) => {
	return (
		<div className={className}>
			<h2 className="text-3xl font-bold mb-4">Recommended Articles</h2>
			{favoriteArticleData.map((article) => {
				return <h3 className="mb-12">{article.title}</h3>;
			})}
		</div>
	);
};

export default RecommendedArticles;
