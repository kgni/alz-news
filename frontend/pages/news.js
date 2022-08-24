import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

// COMPONENTS
import SearchBar from '../components/Search/SearchBar/SearchBar';
import SelectNewsSite from '../components/Search/Select/SelectNewsSite';
import NewsArticlesList from '../components/NewsArticles/NewsArticlesList';
import DropDownFilter from '../components/Search/DropDownFilter';
import FilterNewsSource from '../components/Search/Filters/FilterNewsSource';
import FilterByNewest from '../components/Search/Filters/FilterByNewest';

// SSR function
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:8000/api/news/approved');

	const data = await res.data;

	const newestArticles = data.sort(
		(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	);

	return {
		props: {
			articles: newestArticles,
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

const News = ({ articles }) => {
	// TODO - IMPORT SKELETON FOR WHEN WE ARE LOADING ARTICLES (DO THIS AFTER WE HAVE THE LAYOUT OF HOW WE ARE SHOWING ARTICLES)
	// const [articles, setArticles] = useState(articles);
	const [filterKeyword, setFilterKeyword] = useState('');
	const [sortingOrder, setSortingOrder] = useState('desc');
	const [newsSource, setNewsSource] = useState([]);
	const [articlesPerPage, setArticlesPerPage] = useState(20);

	// computed state, when state changes (like filtering keyword, we will applyfilters again - which is why it works)
	const filteredArticles = applyFilters(
		articles,
		sortingOrder,
		filterKeyword,
		newsSource
	);

	function onToggleSort() {
		setSortingOrder((prevState) => {
			if (prevState === 'desc') {
				return 'asc';
			}
			return 'desc';
		});
	}

	function onSelectChange(event) {
		console.log(event.target.value);
		setArticlesPerPage(event.target.value);
	}

	// function toggleNewest() {
	// 	setNewestFirst((prevState) => !prevState);

	// 	if (!newestFirst) {
	// 		setArticles(
	// 			articles.sort(
	// 				(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	// 			)
	// 		);
	// 		setFilteredArticles(
	// 			filteredArticles.sort(
	// 				(a, b) => new Date(b.publishDate) - new Date(a.publishDate)
	// 			)
	// 		);
	// 	} else {
	// 		setArticles(
	// 			articles.sort(
	// 				(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	// 			)
	// 		);
	// 		setFilteredArticles(
	// 			filteredArticles.sort(
	// 				(a, b) => new Date(a.publishDate) - new Date(b.publishDate)
	// 			)
	// 		);
	// 	}
	// }

	return (
		<>
			<Head>
				<title>ALZ.NEWS</title>
				<meta name="description" content="Alz.news, we have news for you" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="news-section min-h-screen pt-8 pb-8">
				<div className="w-[90%] mx-auto">
					<div className="flex justify-center mb-4 items-center">
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

						<select
							onChange={onSelectChange}
							name="articlesPerPage"
							id="articlesPerPage"
						>
							<option value="10">10</option>
							<option selected value="20">
								20
							</option>
							<option value="30">30</option>
							<option value="40">40</option>
							<option value="50">50</option>
						</select>
					</div>
					<section className="">
						<>
							{/* <div className="mb-8">
								{filteredArticles.length === 0 ? (
									<p className="text-center">No articles found...</p>
								) : (
									<p className="text-center">
										{filteredArticles.length} articles found
									</p>
								)}
							</div> */}

							<NewsArticlesList
								articles={filteredArticles}
								articlesPerPage={articlesPerPage}
								setArticlesPerPage={setArticlesPerPage}
							/>
						</>
					</section>
				</div>
			</section>
		</>
	);
};

export default News;
