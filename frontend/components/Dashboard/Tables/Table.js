import React, { useState, useMemo, useContext } from 'react';
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from 'react-table';
import { NEWS_COLUMNS } from './columns/newsColumns';
import Select from 'react-select';
import { AllNewsContext } from '../../../context/Context';
import styles from '../../../styles/BasicTable.module.css';

import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiOutlineCaretDown,
	AiOutlineCaretUp,
} from 'react-icons/ai';
import {
	BiEdit,
	BiLastPage,
	BiFirstPage,
	BiCaretLeft,
	BiCaretRight,
} from 'react-icons/bi';
import DashBoardModal from '../DashBoardModal';
import DashboardNewsForm from '../News/DashboardNewsForm';
import GlobalFilter from './GlobalFilter';

const SortingBasicTable = () => {
	const [currentShownArticle, setCurrentShownArticle] = useState({});
	const { articles, setArticles, filteredArticles, status, setStatus } =
		useContext(AllNewsContext);
	const [isModalShown, setIsModalShown] = useState(false);
	const [isSearchDropDownShown, setIsSearchDropDownShown] = useState(false);

	const columns = useMemo(() => NEWS_COLUMNS, []);

	const data = useMemo(() => filteredArticles, [filteredArticles]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			disableSortRemove: true,
			initialState: {
				sortBy: [
					{
						id: 'updatedAt',
						desc: true,
					},
					// {
					// 	id: 'publishDate',
					// 	desc: true,
					// },
				],
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	function openArticle(articleData) {
		setCurrentShownArticle(articleData);
		setIsModalShown(true);
	}

	function openAndCloseSearchDropDown(isSearchDropDownShown) {
		if (isSearchDropDownShown) {
			setIsSearchDropDownShown(false);
		} else {
			setIsSearchDropDownShown(true);
		}
	}

	const options = [
		{ value: 'ALL', label: 'ALL' },
		{ value: 'APPROVED', label: 'APPROVED' },
		{ value: 'PENDING', label: 'PENDING' },
		{ value: 'REJECTED', label: 'REJECTED' },
	];

	return (
		<>
			{isModalShown && (
				<>
					<DashBoardModal setIsModalShown={setIsModalShown}>
						<DashboardNewsForm
							setIsModalShown={setIsModalShown}
							currentShownArticle={currentShownArticle}
						/>
					</DashBoardModal>
				</>
			)}
			<div className="flex items-center justify-end gap-4 mb-4">
				{isSearchDropDownShown ? (
					<>
						<div className="relative">
							<div
								onClick={() =>
									openAndCloseSearchDropDown(isSearchDropDownShown)
								}
								className="flex justify-center items-center p-[6px] rounded-md bg-black cursor-pointer"
							>
								<AiFillCaretUp style={{ color: 'white' }} />
							</div>
							<div className="absolute bg-white shadow-md w-52 p-4 left-0 top-[-85px] z-10 rounded-md">
								<Select
									defaultValue={options[0]}
									value={status}
									closeMenuOnSelect={false}
									onChange={(e) => setStatus(e.value)}
									options={options}
									placeholder={status}
								/>
							</div>
						</div>
					</>
				) : (
					<div
						onClick={() => openAndCloseSearchDropDown(isSearchDropDownShown)}
						className="flex justify-center items-center p-[6px] rounded-md bg-black cursor-pointer relative"
					>
						<AiFillCaretDown style={{ color: 'white' }} />
					</div>
				)}

				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				{/* TODO - ABSTRACT PAGINATION AWAY INTO OWN COMPONENT */}
				<div className="flex items-center gap-4 justify-center">
					<div className="flex items-center">
						<BiFirstPage
							onClick={() => gotoPage(0)}
							className={`${
								!canPreviousPage && 'text-black text-opacity-30'
							} flex justify-center items-center cursor-pointer select-none`}
							size="1.2em"
						/>
						<BiCaretLeft
							onClick={() => previousPage()}
							className={`${
								!canPreviousPage && 'text-black text-opacity-30'
							} flex justify-center items-center cursor-pointer select-none`}
							size="1.2em"
						/>
					</div>

					<span className="inline-block text-sm">
						Page {pageIndex + 1} of {pageOptions.length}
					</span>
					<div className="flex items-center">
						<BiCaretRight
							onClick={() => nextPage()}
							className={`${
								!canNextPage && 'text-black text-opacity-30 cursor-not-allowed'
							} flex justify-center items-center cursor-pointer select-none`}
							size="1.2em"
						/>
						<BiLastPage
							onClick={() => gotoPage(pageCount - 1)}
							className={`${
								!canNextPage && 'text-black text-opacity-30 cursor-not-allowed'
							} flex justify-center items-center cursor-pointer select-none`}
							size="1.2em"
						/>
					</div>
					<div className="flex items-center">
						<p>Go to page:&nbsp;</p>
						<input
							type="number"
							className="w-[50px] text-center inline-block"
							defaultValue={pageIndex + 1}
							min={1}
							// value={pageIndex + 1}
							onChange={(e) => {
								const pageNumber = e.target.value
									? Number(e.target.value) - 1
									: 0;
								gotoPage(pageNumber);
							}}
						/>
					</div>
					<select
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
						name=""
						id=""
					>
						{[10, 25, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
			<table className={`${styles.table} shadow-md mb-4`} {...getTableProps()}>
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
					{page
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
			<div className="flex items-center gap-2 justify-center">
				<BiFirstPage
					onClick={() => gotoPage(0)}
					className={`${
						!canPreviousPage && 'text-black text-opacity-30'
					} flex justify-center items-center cursor-pointer select-none mr-[-10px]`}
					size="1.2em"
				/>
				<BiCaretLeft
					onClick={() => previousPage()}
					className={`${
						!canPreviousPage && 'text-black text-opacity-30'
					} flex justify-center items-center cursor-pointer select-none`}
					size="1.2em"
				/>
				<span className="inline-block text-sm">
					Page {pageIndex + 1} of {pageOptions.length}
				</span>

				<BiCaretRight
					onClick={() => nextPage()}
					className={`${
						!canNextPage && 'text-black text-opacity-30 cursor-not-allowed'
					} flex justify-center items-center cursor-pointer select-none`}
					size="1.2em"
				/>
				<BiLastPage
					onClick={() => gotoPage(pageCount - 1)}
					className={`${
						!canNextPage && 'text-black text-opacity-30 cursor-not-allowed'
					} flex justify-center items-center cursor-pointer select-none ml-[-10px]`}
					size="1.2em"
				/>
				<p>Go to page:&nbsp;</p>
				<input
					type="number"
					className="w-[50px] text-center inline-block"
					defaultValue={pageIndex + 1}
					min={1}
					// value={pageIndex + 1}
					onChange={(e) => {
						const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
						gotoPage(pageNumber);
					}}
				/>
			</div>
		</>
	);
};

export default SortingBasicTable;
