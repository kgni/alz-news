import React, { useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { motion } from 'framer-motion';
const SearchBar = ({ placeholder, data, id, setFilteredArticles }) => {
	const [inputValue, setInputValue] = useState('');
	const [filteredData, setFilteredData] = useState([]);

	const handleFilter = (event) => {
		const searchWord = event.target.value.toLowerCase();
		setInputValue(event.target.value);
		const newFilter = data.filter((article) =>
			article.title.toLowerCase().includes(searchWord)
		);
		if (searchWord === '') {
			setFilteredArticles(data);
		} else {
			setFilteredArticles(newFilter);
		}
	};
	const clearInput = () => {
		setFilteredArticles(data);
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
		</div>
	);
};

export default SearchBar;
