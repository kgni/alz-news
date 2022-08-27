import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import BasicTable from '../Tables/BasicTable';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
			<BasicTable columnData={articles} />
		</>
	);
};

export default DashboardNewsContent;
