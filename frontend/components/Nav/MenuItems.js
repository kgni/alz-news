import React from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import Link from 'next/link';

const MenuItems = () => {
	return (
		<ul className="flex gap-x-8 items-center font-bold select-none">
			<li className="cursor-pointer hover:text-gray-600 duration-200 flex items-center gap-2">
				ALZHEIMER'S AND DEMENTIA
				<AiOutlineCaretDown className="text-sm" />
			</li>

			<Link href="/news">
				<li className="cursor-pointer hover:text-gray-600 duration-200">
					NEWS
				</li>
			</Link>
			<Link href="/">
				<li className="cursor-pointer hover:text-gray-600 duration-200">
					JOURNALS
				</li>
			</Link>
		</ul>
	);
};

export default MenuItems;
