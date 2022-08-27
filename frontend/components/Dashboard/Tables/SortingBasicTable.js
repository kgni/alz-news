import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

const SortingBasicTable = ({ columnData }) => {
	const columns = useMemo(() => NEWS_COLUMNS, []);

	const testColumData = columnData.slice(0, 50);
	const data = useMemo(() => testColumData, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		);

	return (
		<table className="table-fixed" {...getTableProps()}>
			<thead className="text-left mb-4 bg-zinc-200">
				{headerGroups.map((headerGroup) => (
					<tr className="" {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								className="py-1 px-2 relative"
								{...column.getHeaderProps(column.getSortByToggleProps())}
							>
								{column.render('Header')}
								<span className="ml-1 absolute top-2">
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
							<tr className="align-top" {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td className="px-2" {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								))}
							</tr>
						);
					})
					.slice(0, 50)}
			</tbody>
		</table>
	);
};

export default SortingBasicTable;
