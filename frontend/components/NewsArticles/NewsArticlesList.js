import React from 'react';
import NewsArticle from './NewsArticle';

const NewsArticlesList = ({ articles }) => {
	return (
		<section className="grid grid-cols-2 gap-4">
			{articles.slice(0, 50).map((article) => (
				<NewsArticle key={article.id} article={article} />
			))}
		</section>
	);
};

export default NewsArticlesList;
