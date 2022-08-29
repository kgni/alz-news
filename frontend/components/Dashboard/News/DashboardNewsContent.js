import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import Table from '../Tables/Table';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
			{/* <BasicTable columnData={articles} /> */}
			<Table columnData={articles} />
		</>
	);
};

export default DashboardNewsContent;
