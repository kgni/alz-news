import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';

const BasicTable = ({ columnData }) => {
	const columns = useMemo(() => NEWS_COLUMNS, []);

	const testColumData = columnData.slice(0, 50);
	const data = useMemo(() => testColumData, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	return (
		<table className="table-fixed" {...getTableProps()}>
			<thead className="text-left mb-4 bg-zinc-200">
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th className="py-1 px-2" {...column.getHeaderProps()}>
								{column.render('Header')}
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

export default BasicTable;
