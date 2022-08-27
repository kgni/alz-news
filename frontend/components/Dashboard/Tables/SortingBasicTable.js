import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';

import styles from '../../../styles/BasicTable.module.css';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

const SortingBasicTable = ({ columnData }) => {
	const columns = useMemo(() => NEWS_COLUMNS, []);

	const testColumData = columnData.slice(0, 50);
	const data = useMemo(() => testColumData, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
				disableSortRemove: true,
			},

			useSortBy
		);

	return (
		<table className={styles.table} {...getTableProps()}>
			<thead className={styles.thead}>
				{headerGroups.map((headerGroup) => (
					<tr className={styles.trHead} {...headerGroup.getHeaderGroupProps()}>
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
							<tr className={styles.trBody} {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td className={styles.td} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								))}
								<td>
									<BiEdit
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
	);
};

export default SortingBasicTable;
