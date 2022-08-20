import React from 'react';

const FilterByNewest = ({ onToggleSort, sortingOrder }) => {
	return (
		<button
			onClick={onToggleSort}
			className="p-1.5 px-6 bg-black text-white font-bold h-full w-[100px] flex justify-center text-sm rounded-tr-md rounded-br-md"
		>
			{sortingOrder === 'desc' ? 'NEWEST' : 'OLDEST'}
		</button>
	);
};

export default FilterByNewest;
