function applySort(articles, sortingOrder) {
	if (sortingOrder === 'desc') {
		return articles.sort(
			(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
		);
	}
	return articles.sort(
		(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	);
}

export const articleSort = {
	applyArticleFilters(
		articles,
		sortingOrder,
		filterKeyword,
		newsSource,
		status
	) {
		// we are applying every filter before sorting
		const filteredArticles = articles.filter((article) =>
			article.title.toLowerCase().includes(filterKeyword.toLowerCase())
		);

		const filteredArticlesByNewsSource =
			newsSource.length > 0
				? filteredArticles.filter((article) =>
						newsSource.includes(article.publisher[0])
				  )
				: filteredArticles;

		const filteredArticlesByStatus = status
			? filteredArticlesByNewsSource.filter(
					(article) => article.status === status
			  )
			: filteredArticlesByNewsSource;

		const sortedArticles = applySort(
			[...filteredArticlesByStatus],
			sortingOrder
		);

		return sortedArticles;
	},

	applyArticleFiltersDashboard(articles, status, isRecommendedActive) {
		const filteredArticlesByStatus =
			status === 'ALL'
				? articles
				: articles.filter((article) => article.status === status);

		const filteredByRecommended = isRecommendedActive
			? filteredArticlesByStatus.filter((article) => article.recommended)
			: filteredArticlesByStatus;

		return filteredByRecommended;
	},
};
