import React, { useState } from 'react';

const DropDown = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	function onToggleOpen() {
		setIsOpen((prevState) => !prevState);
	}

	return (
		<div className="">
			<button onClick={onToggleOpen}>Select</button>
			{isOpen && children}
		</div>
	);
};

export default DropDown;
