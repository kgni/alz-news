import React from 'react';

const ConfirmationBackdrop = ({ children }) => {
	return (
		<>
			<div className="fixed bg-black bg-opacity-60 h-full w-full overflow-hidden z-50 left-72 top-0 "></div>
			<div className="fixed center-dashboard-popup-modal z-50 top-[30%] rounded-lg flex flex-col">
				{children}
			</div>
		</>
	);
};

export default ConfirmationBackdrop;
