import React from 'react';
import NewsArticle from './NewsArticle';

const NewsArticlesList = ({ articles }) => {
	return (
		<section className="grid grid-cols-2 gap-4">
			{articles.map((article) => (
				<NewsArticle article={article} />
			))}
		</section>
	);
};

export default NewsArticlesList;
