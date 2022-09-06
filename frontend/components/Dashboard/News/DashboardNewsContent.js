import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import Table from '../Tables/Table';

const DashboardNewsContent = () => {
	return (
		<>
			<DashboardHeader />
			{/* <BasicTable columnData={articles} /> */}
			<Table />
		</>
	);
};

export default DashboardNewsContent;
