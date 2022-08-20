import React from 'react';

const FilterNewsSource = ({ setNewsSource }) => {
	const newsSites = [
		'The Guardian',
		'alz.org',
		'alzheimers.org.uk',
		'nia.gov',
		'j-alz.com',
		'Neuroscience News',
	];

	return (
		<div className="bg-white z-10 p-4 shadow-md flex mt-4">
			<ul className="grid grid-cols-2 text-xs gap-2">
				{newsSites.map((site) => (
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id={site}
							key={site}
							name={site}
							value={site}
						/>
						<label htmlFor={site}>{site}</label>
					</div>
				))}
			</ul>
		</div>
	);
};

export default FilterNewsSource;
