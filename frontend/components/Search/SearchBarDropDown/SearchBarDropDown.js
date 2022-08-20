import React, { useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { motion } from 'framer-motion';
import SearchResultsDropDown from './SearchResultsDropDown';
import styles from './SearchBar.module.css';

// TODO - USE THIS SEARCH BAR ON THE HOME PAGE, AND USE ANOTHER ONE ON THE INDIVIDUAL PAGES (NEWS AND JOURNALS) - THE INDIVIDUAL ONES ARE GOING TO NOT HAVE A DROPDOWN, BUT SIMPLY SHOW SEARCH RESULTS DIRECTLY ON THE PAGE

const SearchBar = ({ placeholder, data, id }) => {
	const [approvedArticles, setApprovedArticles] = useState([]);

	console.log(approvedArticles);
	const [filteredData, setFilteredData] = useState([]);

	// this is used to keep track of if there is anything in the input or not (used to render)
	const [inputValue, setInputValue] = useState('');

	const handleFilter = (event) => {
		const searchWord = event.target.value.toLowerCase();
		setInputValue(event.target.value);
		const newFilter = data.filter((article) =>
			article.title.toLowerCase().includes(searchWord)
		);
		if (searchWord === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};
	const clearInput = () => {
		setFilteredData([]);
		setInputValue('');
	};

	return (
		<div className="search">
			<div className="searchInputs flex items-center relative">
				<motion.input
					// whileFocus={{ width: '400px' }}
					onFocus={(e) => {
						e.target.placeholder = '';
					}}
					onBlur={(e) => {
						e.target.placeholder = placeholder;
					}}
					className="py-1 px-4 border-0 bg-gray-100 focus:bg-white rounded-md duration-600 w-[500px]"
					placeholder={placeholder}
					type="text"
					id={id}
					onChange={handleFilter}
					value={inputValue}
					autocomplete="off"
				/>
				{inputValue.length === 0 ? (
					<motion.label
						htmlFor={id}
						className="searchIcon cursor-pointer absolute right-3"
					>
						<FaSearch />
					</motion.label>
				) : (
					<IoCloseSharp
						onClick={clearInput}
						className="text-[1.3em] cursor-pointer absolute right-3"
					/>
				)}
			</div>
			{/* only showing the search results, when the filteredData has items in it */}
			{filteredData.length != 0 && (
				<div
					className={`${styles.dataResults} dataResults absolute shadow-lg p-2 bg-gray-100 max-w-[500px] mt-2 rounded-md overflow-hidden h-[320px] overflow-y-auto`}
				>
					{/* // TODO - MAKE THE SEARCH RESULTS INFINITE SCROLL, RIGHT NOW WE ARE ONLY SHOWING 30 IN TOTAL - MAKE IT SO THAT WE SHOW 30 TO START WITH BUT WE ADD X AMOUNT WHEN WE SCROLL PAST 30 */}
					{data &&
						filteredData
							.slice(0, 30)
							.map((article, index) => (
								<SearchResultsDropDown
									key={article.id}
									article={article}
									index={index}
								/>
							))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
