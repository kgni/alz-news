import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import ReactPaginate from 'react-paginate';
import RecommendedArticles from './RecommendedArticles';
import RecommendedResources from '../RecommendedResources';

// search
import SearchBar from '../Search/SearchBar/SearchBar';
import DropDownFilter from '../Search/DropDownFilter';
import FilterByNewest from '../Search/Filters/FilterByNewest';

import { AiOutlineMinus } from 'react-icons/ai';

const NewsArticlesList = ({
	articles,
	newsSource,
	setNewsSource,
	filterKeyword,
	setFilterKeyword,
	onToggleSort,
	sortingOrder,
}) => {
	// TODO - CAN WE MOVE PAGINATION OUT OF THE NewsArticlesList, and into the SearchBar instead?
	// TODO - FIX PAGINATION (DON'T LET IT EXPAND LIKE IT DOES, IT SHOULD BE FIXED)

	// PAGINATION

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

	const onClickRemoveNewsSource = (event) => {
		setNewsSource((prevState) =>
			prevState.filter((source) => source !== event.target.innerText)
		);
	};

	//! scroll to top after clicking on pagination - HOW SHOULD WE ELSE DO IT?

	const onClickScrollToTop = () => window.scrollTo({ top: 0, left: 0 });

	return (
		<>
			<div className="mb-8"></div>
			<div className="flex gap-x-8">
				<div className="flex flex-col basis-1/3 self-start">
					<RecommendedArticles className="" />
					<RecommendedResources className="" />
				</div>
				<section className="mb-8 basis-2/3">
					{/* <h1 className="text-4xl font-bold mb-4">All Articles</h1> */}
					<div className="flex mb-4 items-center mx-auto justify-center relative">
						<ul className="absolute left-[300px] top-[48px] flex gap-2 flex-wrap">
							{newsSource.map((source) => {
								// create publisher tag styles:
								let tagStyle;

								switch (source) {
									case 'The Guardian':
										tagStyle =
											'bg-blue-800 text-white hover:bg-blue-700 duration-150';
										break;
									case 'alz.org':
										tagStyle =
											'bg-purple-800 text-white hover:bg-purple-700 duration-150';
										break;
									case 'Neuroscience News':
										tagStyle =
											'bg-yellow-400 text-black hover:bg-yellow-700 duration-150';
										break;

									case 'j-alz.com':
										tagStyle =
											'bg-green-800 text-white hover:bg-green-700 duration-150';
										break;
									case 'alzheimers.org.uk':
										tagStyle =
											'bg-cyan-800 text-white hover:bg-cyan-700 duration-150';
										break;

									case 'nia.gov':
										tagStyle =
											'bg-red-800 text-white hover:bg-red-700 duration-150';
										break;
								}

								return (
									<li
										onClick={onClickRemoveNewsSource}
										className={`${tagStyle} rounded-full text-xs px-4 py-1 cursor-pointer`}
									>
										{source}
									</li>
								);
							})}
						</ul>

						<DropDownFilter
							newsSource={newsSource}
							setNewsSource={setNewsSource}
						/>

						<SearchBar
							placeholder="Enter Article Title..."
							inputId="search"
							filterKeyword={filterKeyword}
							setFilterKeyword={setFilterKeyword}
						/>
						<FilterByNewest
							onToggleSort={onToggleSort}
							sortingOrder={sortingOrder}
						/>
					</div>
					<div className="mb-4 italic flex gap-2">
						{articles.length === 0 ? (
							<p className="font-semibold">No articles found...</p>
						) : (
							<>
								<p className="font-semibold">
									{articles.length} articles found
								</p>
								<span>&#8211;</span>
								<p className="italic">
									page {currentPage + 1} of {pageCount}
								</p>
							</>
						)}
					</div>

					<section className="mb-8">
						{currentItems.map((article) => (
							<NewsArticle key={article.id} article={article} />
						))}
					</section>
					<ReactPaginate
						key="paginate2"
						onClick={onClickScrollToTop}
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
				</section>
			</div>
			<div className=""></div>
		</>
	);
};

export default NewsArticlesList;
