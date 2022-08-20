import React, { useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { motion } from 'framer-motion';

const SearchBar = ({
	placeholder,
	inputId,
	filterKeyword,
	setFilterKeyword,
}) => {
	const onChangeFilterKeyword = (event) => {
		setFilterKeyword(event.target.value);
	};

	const onClearInput = () => {
		setFilterKeyword('');
	};

	// select

	return (
		<div className="search">
			<div className="searchInputs flex items-center relative">
				<motion.input
					whileFocus={{ width: '400px' }}
					onFocus={(e) => {
						e.target.placeholder = '';
					}}
					onBlur={(e) => {
						e.target.placeholder = placeholder;
					}}
					className="py-1 px-4 border-0 bg-gray-100 focus:bg-white  duration-600 w-[300px]"
					placeholder={placeholder}
					type="text"
					id={inputId}
					onChange={onChangeFilterKeyword}
					value={filterKeyword}
					autocomplete="off"
				/>
				{filterKeyword.length === 0 ? (
					<motion.label
						htmlFor={inputId}
						className="searchIcon cursor-pointer absolute right-3"
					>
						<FaSearch />
					</motion.label>
				) : (
					<IoCloseSharp
						// this is set to onMouseDown instead of click, because we want to clear the input and blur at the same time, if we just had onClick, the input field would get blurred first, and the input would not be cleared until next time we would click it
						onMouseDown={onClearInput}
						className="text-[1.3em] cursor-pointer absolute right-3"
					/>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
