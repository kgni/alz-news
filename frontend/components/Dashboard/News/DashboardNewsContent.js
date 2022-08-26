import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import DashboardList from '../DashboardList';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
			<DashboardList data={articles} />
		</>
	);
};

export default DashboardNewsContent;
