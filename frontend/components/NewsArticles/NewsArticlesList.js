import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import ReactPaginate from 'react-paginate';

const NewsArticlesList = ({
	articles,
	articlesPerPage,
	setArticlesPerPage,
}) => {
	const [pageNumber, setPageNumber] = useState(0);

	// number for how many articles we want to display per page.

	const pagesVisited = pageNumber * articlesPerPage;

	const pageCount = Math.ceil(articles.length / articlesPerPage);

	// function for setting the actual page number, the selected object comes from the ReactPaginate component, this will give us the pagenumber that was clicked on.
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<>
			<div className="mb-8">
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={changePage}
					pageRangeDisplayed={3}
					marginPagesDisplayed={1}
					containerClassName={'paginationBtns'}
					previousLinkClassName={'previousBtn'}
					nextLinkClassName={'nextBtn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
					breakLinkClassName={'breakLink'}
				/>
			</div>
			<section className="grid grid-cols-2 gap-4 mb-8">
				{articles
					.slice(pagesVisited, pagesVisited + articlesPerPage)
					.map((article) => (
						<NewsArticle key={article.id} article={article} />
					))}
			</section>
			<div className="">
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={changePage}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					containerClassName={'paginationBtns'}
					previousLinkClassName={'previousBtn'}
					nextLinkClassName={'nextBtn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
					breakLinkClassName={'breakLink'}
				/>
			</div>
		</>
	);
};

export default NewsArticlesList;
