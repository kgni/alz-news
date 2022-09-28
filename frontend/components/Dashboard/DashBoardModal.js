import React from 'react';
const DashBoardModal = ({ children, setIsModalShown }) => {
	return (
		<>
			<div
				onClick={() => setIsModalShown(false)}
				className="fixed bg-black bg-opacity-60 h-full w-screen  overflow-hidden z-40 left-0 top-0 "
			></div>
			<div className="fixed z-50 center-dashboard-modal">{children}</div>
		</>
	);
};

export default DashBoardModal;
