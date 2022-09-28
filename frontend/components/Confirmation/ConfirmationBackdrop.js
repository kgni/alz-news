import React from 'react';

const ConfirmationBackdrop = ({ children }) => {
	return (
		<>
			<div className="fixed bg-black bg-opacity-60 h-full w-full overflow-hidden z-40 left-0 top-0 "></div>
			<div className="fixed center-dashboard-popup-modal z-40 top-[30%] rounded-lg flex flex-col">
				{children}
			</div>
		</>
	);
};

export default ConfirmationBackdrop;
