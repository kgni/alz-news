import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ filter, setFilter }) => {
	// This state and function will be used for debouncing, the 2nd argument passed to useAsyncDebounce is the debounce in milliseconds
	const [value, setValue] = useState(filter);
	const onChange = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 200);
	return (
		<div className="flex justify-start">
			<input
				className=" px-2 py-1 rounded-lg shadow-md"
				placeholder="Search..."
				type="text"
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				onFocus={(e) => (e.target.placeholder = '')}
				onBlur={(e) => (e.target.placeholder = 'Search...')}
			/>
		</div>
	);
};

export default GlobalFilter;
