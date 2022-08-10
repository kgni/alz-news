import React from 'react';

const FilterNewsSites = () => {
	const newsSites = [
		'The Guardian',
		'alz.org',
		'alzheimers.org.uk',
		'nia.gov',
		'j-alz.com',
		'Neuroscience News',
	];

	return (
		<ul className="grid grid-cols-3 text-xs">
			{newsSites.map((site) => (
				<li>{site}</li>
			))}
		</ul>
	);
};

export default FilterNewsSites;
