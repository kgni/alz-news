import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SearchResults from './SearchResults';

const SearchBar = ({ placeholder, data, id }) => {
	return (
		<div className="search">
			<div className="searchInputs flex items-center relative">
				<motion.input
					whileFocus={{ width: '400px' }}
					onFocus={(e) => (e.target.placeholder = '')}
					onBlur={(e) => (e.target.placeholder = placeholder)}
					className="py-1 px-4 border-0 bg-gray-100 focus:bg-white rounded-full duration-600 w-[300px]"
					placeholder={placeholder}
					type="text"
					id={id}
				/>
				<motion.label
					for={id}
					className="searchIcon cursor-pointer absolute right-3"
				>
					<FaSearch />
				</motion.label>
			</div>
			<div className="dataResults absolute shadow-md p-2 bg-gray-100 max-w-[400px] mt-2">
				{data &&
					data.map((article, index) => (
						<SearchResults article={article} index={index} />
					))}
			</div>
		</div>
	);
};

export default SearchBar;
