import React from 'react';
import DashboardHeader from '../Header/DashboardHeader';
import BasicTable from '../Tables/BasicTable';
import SortingBasicTable from '../Tables/SortingBasicTable';

const DashboardNewsContent = ({ articles }) => {
	return (
		<>
			<DashboardHeader articles={articles} />
			{/* <BasicTable columnData={articles} /> */}
			<SortingBasicTable columnData={articles} />
		</>
	);
};

export default DashboardNewsContent;
