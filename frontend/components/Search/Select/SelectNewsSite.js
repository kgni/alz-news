import React from 'react';
import Select, { StylesConfig } from 'react-select';
const SelectNewsSite = () => {
	const options = [
		{ value: 'The Guardian', label: 'The Guardian' },
		{ value: 'alz.org', label: 'alz.org' },
		{ value: 'alzheimers.org.uk', label: 'alzheimers.org.uk' },
		{ value: 'nia.gov', label: 'nia.gov' },
		{ value: 'j-alz.com', label: 'j-alz.com' },
		{ value: 'Neuroscience News', label: 'Neuroscience News' },
	];

	const handleChange = (selectedOption) => {
		console.log('handleChange', selectedOption);
	};
	return (
		<Select
			className="w-[300px]"
			options={options}
			onChange={handleChange}
			isMulti
		/>
	);
};

export default SelectNewsSite;
