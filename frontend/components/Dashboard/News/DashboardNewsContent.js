import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
		</>
	);
};

export default DashboardNewsContent;
