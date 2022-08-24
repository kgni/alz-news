import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import ReactPaginate from 'react-paginate';
import RecommendedArticles from './RecommendedArticles';

const NewsArticlesList = ({ articles }) => {
	// TODO - CAN WE MOVE PAGINATION OUT OF THE NewsArticlesList, and into the SearchBar instead?
	// TODO - FIX PAGINATION (DON'T LET IT EXPAND LIKE IT DOES, IT SHOULD BE FIXED)
	// We start with an empty list of articles.
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 24;

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading articles from ${itemOffset} to ${endOffset}`);
		setCurrentItems(articles.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(articles.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, articles]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % articles.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};
	return (
		<>
			<div className="mb-8">
				<ReactPaginate
					previousLabel={'<'}
					breakLabel={'...'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
					marginPagesDisplayed={2}
					containerClassName={'paginationBtns'}
					previousLinkClassName={'previousBtn'}
					nextLinkClassName={'nextBtn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
					breakLinkClassName={'breakLink'}
				/>
			</div>
			<div className="">
				<RecommendedArticles className="float-left mr-8" />
				<section className="col-span-3 mb-8">
					{currentItems.map((article) => (
						<NewsArticle key={article.id} article={article} />
					))}
				</section>
			</div>
			<div className="">
				<ReactPaginate
					previousLabel={'<'}
					breakLabel={'...'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
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
