import { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

// COMPONENTS
import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import Layout from '../components/UI/Layout/Layout';
import RecommendedArticles from '../components/NewsArticles/RecommendedArticles';
import RecommendedResources from '../components/RecommendedResources';
import DropDownFilter from '../components/Search/DropDownFilter';
import SearchBar from '../components/Search/SearchBar/SearchBar';
import FilterByNewest from '../components/Search/Filters/FilterByNewest';
import ReactPaginate from 'react-paginate';
import NewsSourceTags from '../components/NewsArticles/NewsSourceTags';
import Head from 'next/head';

// SSR function
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/api/news/approved');

	const { articles, allArticlesLength, page, totalPages, recommendedArticles } =
		await res.data;

	console.log(allArticlesLength, page, totalPages);

	return {
		props: {
			articles,
			allArticlesLength,
			page,
			totalPages,
			recommendedArticles,
		},
	};
}

// sorting function
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

// applyingFilters function to use on the articles themselves
function applyFilters(articles, sortingOrder, filterKeyword, newsSource) {
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

	const sortedArticles = applySort(
		[...filteredArticlesByNewsSource],
		sortingOrder
	);

	return sortedArticles;
}

export default function Page({
	articles,
	recommendedArticles,
	allArticlesLength,
	page,
	totalPages,
}) {
	const [currentArticles, setCurrentArticles] = useState(articles);
	const [articlesLength, setArticlesLength] = useState(allArticlesLength);
	const [filterKeyword, setFilterKeyword] = useState('');
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [newsSource, setNewsSource] = useState([]);

	// session

	// PAGINATION

	const [currentPage, setCurrentPage] = useState(page - 1);
	const [allPages, setAllPages] = useState(totalPages);

	const handlePageClick = async (event) => {
		try {
			const res = await axios.get(`http://localhost:8000/api/news/approved/`, {
				params: {
					page: event.selected + 1,
					sortingOrder,
					filterKeyword,
					newsSource,
				},
			});

			const { articles, allArticlesLength, totalPages } = res.data;
			setCurrentArticles(articles);
			setArticlesLength(allArticlesLength);
			setCurrentPage(event.selected);
			setAllPages(totalPages);
		} catch (e) {
			console.log(e);
		}
	};

	const onClickRemoveNewsSource = (event) => {
		setNewsSource((prevState) =>
			prevState.filter((source) => source !== event.target.innerText)
		);
	};

	//! scroll to top after clicking on pagination - HOW SHOULD WE ELSE DO IT?

	const onClickScrollToTop = () => window.scrollTo({ top: 0, left: 0 });

	async function onToggleSort() {
		const negatedSortingOrder = sortingOrder === 'desc' ? 'asc' : 'desc';
		const res = await axios.get(`http://localhost:8000/api/news/approved/`, {
			params: {
				page: currentPage + 1,
				sortingOrder: negatedSortingOrder,
				filterKeyword,
				newsSource,
			},
		});

		const { articles, allArticlesLength, totalPages } = res.data;
		setCurrentArticles(articles);
		setArticlesLength(allArticlesLength);
		setAllPages(totalPages);
		setSortingOrder((prevState) => {
			return prevState === 'desc' ? 'asc' : 'desc';
		});
	}

	// debouncing our onchange keyword input
	const debouncedKeywordSearch = debounce(async (keyword) => {
		const res = await axios.get(`http://localhost:8000/api/news/approved/`, {
			params: {
				page: currentPage + 1,
				sortingOrder,
				filterKeyword: keyword,
				newsSource,
			},
		});

		const { articles, allArticlesLength, totalPages } = res.data;
		setCurrentArticles(articles);
		setArticlesLength(allArticlesLength);
		setAllPages(totalPages);
	}, 300);

	const onChangeFilterKeyword = async (event, clear) => {
		clear ? setFilterKeyword('') : setFilterKeyword(event.target.value);
		debouncedKeywordSearch(event.target.value);
	};

	async function onClickSetNewsSource(event) {
		// if the box is checked
		if (event.target.checked) {
			//we add it to th current state of the NewsSources
			setNewsSource((prevState) => [...prevState, event.target.value]);
		} else {
			// if the box was unchecked, we remove it from the current newsSources
			setNewsSource((prevState) =>
				prevState.filter((source) => source !== event.target.value)
			);
		}
		const res = await axios.get(`http://localhost:8000/api/news/approved/`, {
			params: {
				page: currentPage + 1,
				sortingOrder,
				filterKeyword,
				newsSource: !newsSource ? event.target.checked : newsSource,
			},
		});

		const { articles, allArticlesLength, totalPages } = res.data;
		setCurrentArticles(articles);
		setArticlesLength(allArticlesLength);
		setAllPages(totalPages);
	}
	return (
		<>
			<Head>
				<title>ALZ.NEWS - NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className=" mx-auto py-8">
				<section className="flex gap-x-8">
					<div className="flex flex-col w-1/3 self-start bg-white rounded-md shadow-md">
						<RecommendedArticles articles={recommendedArticles} className="" />
					</div>

					<div className="flex flex-col w-2/3  p-4 shadow-md bg-white rounded-md">
						<div className="flex items-center justify-center relative mb-3">
							<DropDownFilter
								newsSource={newsSource}
								setNewsSource={setNewsSource}
								onClickSetNewsSource={onClickSetNewsSource}
							/>
							<SearchBar
								placeholder="Enter Article Title..."
								inputId="search"
								onChangeFilterKeyword={onChangeFilterKeyword}
								filterKeyword={filterKeyword}
							/>
							<FilterByNewest
								onToggleSort={onToggleSort}
								sortingOrder={sortingOrder}
							/>
						</div>
						<NewsSourceTags
							newsSource={newsSource}
							onClickRemoveNewsSource={onClickRemoveNewsSource}
						/>

						<div className=" italic flex gap-2 mb-3">
							{currentArticles.length === 0 ? (
								<p className="font-semibold">No articles found...</p>
							) : (
								<>
									<p className="font-semibold">
										{articlesLength} articles found
									</p>
									<span>&#8211;</span>
									<p className="italic">
										page {currentPage + 1} of {allPages}
									</p>
								</>
							)}
						</div>

						<NewsArticlesList currentItems={currentArticles} />

						<ReactPaginate
							key="paginate2"
							onClick={onClickScrollToTop}
							forcePage={currentPage}
							previousLabel={'<'}
							breakLabel={'...'}
							nextLabel={'>'}
							pageCount={allPages}
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

					{/* <div className="flex flex-col w-1/4 self-start bg-white rounded-md shadow-md">
						<RecommendedResources className="" />
					</div> */}
				</section>
			</div>
		</>
	);
}

Page.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
