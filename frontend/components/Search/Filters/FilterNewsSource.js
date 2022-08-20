import React from 'react';

const FilterNewsSource = ({ newsSource, setNewsSource, setIsOpen }) => {
	const newsSites = [
		'The Guardian',
		'alz.org',
		'alzheimers.org.uk',
		'nia.gov',
		'j-alz.com',
		'Neuroscience News',
	];

	// onChange handler for checkboxes

	function onChangeFilterNewsSource(event) {
		// if the box is checked
		if (event.target.checked) {
			//we add it to th current state of the NewsSources
			setNewsSource((prevState) => [...prevState, event.target.value]);
		} else {
			// if the box was unchecked, we remove it from the current newsSources
			setNewsSource((prevState) =>
				prevState.filter((source) => source !== event.target.value)
			);
		}
	}

	return (
		<>
			<div className="bg-white z-10 p-4 shadow-md mt-4 absolute">
				<ul className="grid grid-cols-2 text-xs gap-2 mb-4">
					{newsSites.map((site) => (
						<div className="flex items-center gap-2">
							<input
								autoComplete="off"
								type="checkbox"
								id={site}
								key={site}
								name={site}
								value={site}
								// checking if the newsSource includes the site, if it does it is checked
								checked={newsSource.includes(site)}
								onChange={onChangeFilterNewsSource}
							/>
							<label htmlFor={site}>{site}</label>
						</div>
					))}
				</ul>

				<button
					onClick={() => setIsOpen(false)}
					className="bg-black text-white w-full font-semibold uppercase text-sm py-1"
				>
					Close
				</button>
			</div>
		</>
	);
};

export default FilterNewsSource;
