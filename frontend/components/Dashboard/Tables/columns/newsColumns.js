import { format, formatDistance, subDays } from 'date-fns';
import { ImCross } from 'react-icons/im';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { FaGlobeEurope } from 'react-icons/fa';

export const NEWS_COLUMNS = [
	{
		Header: 'Title',
		accessor: 'title',
		Cell: ({ value }) => {
			if (!value) {
				return (
					<span className="bg-[#FDEBEB] text-[#F14546] rounded-full font-bold inline-flex w-34 px-3 items-center justify-between gap-2 py-[2px] text-sm">
						<ImCross size={'.8em'} style={{ color: '#F14546' }} />
						MISSING
					</span>
				);
			} else {
				return `${value.split(' ').slice(0, 5).join(' ')}...`;
			}
		},
	},
	{
		Header: 'Subtitle',
		accessor: 'subtitle',
		Cell: ({ value }) => {
			if (!value) {
				return (
					<span className="bg-[#FDEBEB] text-[#F14546] rounded-full font-bold inline-flex w-34 px-3 items-center justify-between gap-2 py-[2px] text-sm">
						<ImCross size={'.8em'} style={{ color: '#F14546' }} />
						MISSING
					</span>
				);
			} else {
				return `${value.split(' ').slice(0, 5).join(' ')}...`;
			}
		},
	},
	{
		Header: 'Type',
		accessor: 'type',
		Cell: ({ value }) => {
			return 'News';
		},
	},
	{
		Header: 'Publisher',
		accessor: 'publisher',
		Cell: ({ value }) => {
			// let tagStyle;
			// switch (value[0]) {
			// 	case 'The Guardian':
			// 		tagStyle = 'bg-blue-800 text-white';
			// 		break;
			// 	case 'alz.org':
			// 		tagStyle = 'bg-purple-800 text-white';
			// 		break;
			// 	case 'Neuroscience News':
			// 		tagStyle = 'bg-yellow-400 text-black';
			// 		break;
			// 	case 'j-alz.com':
			// 		tagStyle = 'bg-green-800 text-white';
			// 		break;
			// 	case 'alzheimers.org.uk':
			// 		tagStyle = 'bg-cyan-800 text-white';
			// 		break;
			// 	case 'nia.gov':
			// 		tagStyle = 'bg-red-800 text-white';
			// 		break;
			// }
			// return (
			// 	<span
			// 		className={`${tagStyle} p-1 px-4 rounded-full text-xs font-bold inline-flex justify-center`}
			// 	>
			// 		{value[0]}
			// 	</span>
			// );

			return value[0];
		},
	},
	{
		Header: 'Publish Date',
		accessor: 'publishDate',
		Cell: ({ value }) => {
			return format(new Date(value), 'dd/MM/yyyy');
		},
	},
	{
		Header: 'Status',
		accessor: 'status',
		Cell: ({ value }) => {
			if (value === 'PENDING') {
				return (
					<span
						onClick={() => alert('clicked')}
						className="p-1 px-4 bg-[#FEF8E8] text-[#F4C745] font-bold text-xs rounded-full inline-flex items-center gap-1 w-[70%] justify-center cursor-pointer"
					>
						{value}
						{/* <AiOutlineCaretDown
							className="ml-auto"
							style={{ cursor: 'pointer' }}
						/> */}
					</span>
				);
			}

			if (value === 'APPROVED') {
				return (
					<span className="p-1 px-4 bg-[#EBF9EB] text-[#3EC13D] font-bold text-xs rounded-full inline-flex items-center gap-1 w-[70%] justify-center cursor-pointer">
						{value}
						{/* <AiOutlineCaretDown
							className="ml-auto"
							style={{ cursor: 'pointer' }}
						/> */}
					</span>
				);
			}

			if (value === 'REJECTED') {
				return (
					<span className="p-1 px-4 bg-[#FDEBEB] text-[#F14546] font-bold text-xs rounded-full inline-flex items-center gap-1 w-[70%] cursor-pointer">
						{value}
						<AiOutlineCaretDown
							className="ml-auto"
							style={{ cursor: 'pointer' }}
						/>
					</span>
				);
			}
		},
	},
	{
		Header: 'Last Edited',
		accessor: 'updatedAt',
		Cell: ({ value }) => {
			return (
				<>
					<span className="font-semibold">
						{format(new Date(value), 'MMMPP')}
					</span>
					<span className="text-xs text-zinc-400 font-semibold block">
						{formatDistance(subDays(new Date(value), 3), new Date(), {
							addSuffix: true,
						})}
					</span>
				</>
			);
		},
	},
	{
		accessor: 'url',
		Cell: ({ value }) => {
			return (
				<a className="" href={value} target="_blank">
					<FaGlobeEurope />
				</a>
			);
		},
	},
];
