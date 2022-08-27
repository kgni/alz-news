import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';

const BasicTable = ({ columnData }) => {
	const columns = useMemo(() => NEWS_COLUMNS, []);
	const data = useMemo(() => columnData, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	return (
		<table {...getTableProps()}>
			<thead className="text-left">
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default BasicTable;
