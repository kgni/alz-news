import React, { useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { motion } from 'framer-motion';
import SearchResults from './SearchResults';
import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder, data, id }) => {
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
					className="py-1 px-4 border-0 bg-gray-100 focus:bg-white rounded-md duration-600 w-[400px]"
					placeholder={placeholder}
					type="text"
					id={id}
					onChange={handleFilter}
					value={inputValue}
				/>
				{inputValue.length === 0 ? (
					<motion.label
						for={id}
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
					className={`${styles.dataResults} dataResults absolute shadow-lg p-2 bg-gray-100 max-w-[400px] mt-2 rounded-md overflow-hidden h-[320px] overflow-y-auto`}
				>
					{data &&
						filteredData
							.slice(0, 30)
							.map((article, index) => (
								<SearchResults article={article} index={index} />
							))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
