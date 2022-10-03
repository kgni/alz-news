import React from 'react';
import NewsArticle from './NewsArticle';

const NewsArticlesList = ({ currentItems }) => {
	// Invoke when user click to request another page.

	return (
		<>
			<section className="">
				{currentItems.map((article) => (
					<NewsArticle key={article.id} article={article} />
				))}
			</section>

			<div className=""></div>
		</>
	);
};

export default NewsArticlesList;
