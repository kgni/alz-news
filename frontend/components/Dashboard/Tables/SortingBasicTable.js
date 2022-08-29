import React, { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';

import styles from '../../../styles/BasicTable.module.css';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import DashBoardModal from '../DashBoardModal';
import DashboardNewsForm from '../News/DashboardNewsForm';

const SortingBasicTable = ({ columnData }) => {
	const [currentShownArticle, setCurrentShownArticle] = useState({});
	const [isModalShown, setIsModalShown] = useState(false);

	const columns = useMemo(() => NEWS_COLUMNS, []);

	const data = useMemo(() => columnData.slice(0, 50), []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
				disableSortRemove: true,
			},

			useSortBy
		);

	function openArticle(articleData) {
		setCurrentShownArticle(articleData);
		setIsModalShown(true);
	}

	return (
		<>
			{isModalShown && (
				<>
					<DashBoardModal setIsModalShown={setIsModalShown}>
						<DashboardNewsForm currentShownArticle={currentShownArticle} />
					</DashBoardModal>
				</>
			)}
			<table className={`${styles.table} shadow-md`} {...getTableProps()}>
				<thead className={styles.thead}>
					{headerGroups.map((headerGroup) => (
						<tr
							className={styles.trHead}
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column) => (
								<th
									className={`${styles.th} relative`}
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render('Header')}
									<span className="ml-1 absolute top-[19px]">
										{column.isSorted ? (
											column.isSortedDesc ? (
												<AiOutlineCaretDown />
											) : (
												<AiOutlineCaretUp />
											)
										) : (
											''
										)}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="" {...getTableBodyProps()}>
					{rows
						.map((row) => {
							prepareRow(row);
							return (
								<tr className={`${styles.trBody}`} {...row.getRowProps()}>
									{row.cells.map((cell) => (
										<td className={styles.td} {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									))}
									<td>
										<BiEdit
											onClick={() => openArticle(row.original)}
											style={{ cursor: 'pointer', marginRight: '12px' }}
											size="1.2em"
										/>
									</td>
								</tr>
							);
						})
						.slice(0, 50)}
				</tbody>
			</table>
		</>
	);
};

export default SortingBasicTable;
