import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import ReactPaginate from 'react-paginate';
import RecommendedArticles from './RecommendedArticles';
import RecommendedResources from '../RecommendedResources';

const NewsArticlesList = ({ articles }) => {
	// TODO - CAN WE MOVE PAGINATION OUT OF THE NewsArticlesList, and into the SearchBar instead?
	// TODO - FIX PAGINATION (DON'T LET IT EXPAND LIKE IT DOES, IT SHOULD BE FIXED)
	// We start with an empty list of articles.
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 12;

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
		setCurrentPage(event.selected);
	};

	return (
		<>
			<div className="mb-8">
				{/* <ReactPaginate
					key="paginate1"
					forcePage={currentPage}
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
					renderOnZeroPageCount={null}
				/> */}
			</div>
			<div className="flex gap-x-8">
				<div className="flex flex-col basis-1/3 self-start">
					<RecommendedArticles className="" />
					<RecommendedResources className="" />
				</div>
				<section className="mb-8 basis-2/3">
					<h1 className="text-4xl font-bold mb-4">All Articles</h1>
					{currentItems.map((article) => (
						<NewsArticle key={article.id} article={article} />
					))}
				</section>
			</div>
			<div className="">
				<ReactPaginate
					key="paginate2"
					forcePage={currentPage}
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
					renderOnZeroPageCount={null}
				/>
			</div>
		</>
	);
};

export default NewsArticlesList;
