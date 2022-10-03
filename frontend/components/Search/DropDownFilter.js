import React, { useState } from 'react';
import FilterNewsSource from './Filters/FilterNewsSource';

import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

const DropDownFilter = ({
	children,
	newsSource,
	setNewsSource,
	onClickSetNewsSource,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	function onToggleOpen() {
		setIsOpen((prevState) => !prevState);
	}

	return (
		<div className="">
			{isOpen ? (
				<>
					<button
						className=" bg-black text-white p-2 rounded-tl-md rounded-bl-md"
						onClick={onToggleOpen}
					>
						<AiFillCaretUp />
					</button>

					<FilterNewsSource
						setIsOpen={setIsOpen}
						newsSource={newsSource}
						setNewsSource={setNewsSource}
						onClickSetNewsSource={onClickSetNewsSource}
					/>
				</>
			) : (
				<button
					className="bg-black text-white p-2 rounded-tl-md rounded-bl-md"
					onClick={onToggleOpen}
				>
					<AiFillCaretDown />
				</button>
			)}
		</div>
	);
};

export default DropDownFilter;
