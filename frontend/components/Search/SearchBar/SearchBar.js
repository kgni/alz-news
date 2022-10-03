import React, { useState } from 'react';

// icons
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { motion } from 'framer-motion';

const SearchBar = ({
	placeholder,
	inputId,
	onChangeFilterKeyword,
	filterKeyword,
}) => {
	const onClearInput = () => {
		onChangeFilterKeyword(event, 'clear');
	};

	// select

	return (
		<>
			<div className="flex grow items-center relative">
				<motion.input
					onFocus={(e) => {
						e.target.placeholder = '';
					}}
					onBlur={(e) => {
						e.target.placeholder = placeholder;
					}}
					className="py-1 px-2 bg-gray-200 grow border-black duration-600 focus:outline-none"
					placeholder={placeholder}
					type="text"
					id={inputId}
					onChange={onChangeFilterKeyword}
					value={filterKeyword}
					autoComplete="off"
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
		</>
	);
};

export default SearchBar;
