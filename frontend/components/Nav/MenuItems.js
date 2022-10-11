import React, { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import NavDropDown from './NavDropDown';
import useEventListener from '../../hooks/useEventListener';

const MenuItems = () => {
	const [isOpen, setIsOpen] = useState(false);

	const ESCAPE_KEYS = ['27', 'Escape'];

	function navDropDownEscape({ key }) {
		if (ESCAPE_KEYS.includes(String(key))) {
			setIsOpen(false);
		}
	}

	function openNavDropDownEnter(event) {
		if (event.key === 'Enter') {
			setIsOpen((prev) => !prev);
		}
	}

	useEventListener('keydown', navDropDownEscape);

	return (
		<ul className="flex grow justify-center gap-x-8 items-center font-bold select-none relative">
			<li
				tabIndex={1}
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={openNavDropDownEnter}
				className="cursor-pointer hover:text-gray-600 duration-200 flex items-center gap-2"
			>
				ALZHEIMER'S AND DEMENTIA
				{isOpen ? (
					<AiOutlineCaretUp className="text-sm" />
				) : (
					<AiOutlineCaretDown className="text-sm" />
				)}
				{isOpen && <NavDropDown />}
			</li>
			<li className="cursor-pointer hover:text-gray-600 duration-200">
				<Link href="/news">NEWS</Link>
			</li>
			{/* <Link href="/">
				<li className="cursor-pointer hover:text-gray-600 duration-200">
					JOURNALS
				</li>
			</Link> */}
		</ul>
	);
};

export default MenuItems;
