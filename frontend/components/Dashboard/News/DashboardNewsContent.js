import React from 'react';
import DashboardHeader from '../DashboardHeader';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
		</>
	);
};

export default DashboardNewsContent;
