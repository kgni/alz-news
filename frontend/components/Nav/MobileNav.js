import Link from 'next/link';
import React, { useState } from 'react';
import {
	AiOutlineCaretDown,
	AiOutlineCaretRight,
	AiOutlineCaretUp,
} from 'react-icons/ai';
import MenuItems from './MenuItems';
import MobileSideBarNav from './MobileSideBarNav';
import ProfileItem from './ProfileItem';

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [alzOpen, setAlzOpen] = useState(false);
	const [demOpen, setDemOpen] = useState(false);

	function closeNav() {
		setIsOpen(false);
	}

	return (
		<nav className="mx-auto py-12 flex items-center text-black border-b-2 border-black">
			{isOpen && (
				<>
					<MobileSideBarNav
						alzOpen={alzOpen}
						setAlzOpen={setAlzOpen}
						demOpen={demOpen}
						setDemOpen={setDemOpen}
						closeNav={closeNav}
					/>
				</>
			)}

			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex flex-col gap-1 cursor-pointer"
			>
				<div className="w-6 h-[3px] bg-black"></div>
				<div className="w-6 h-[3px] bg-black"></div>
				<div className="w-6 h-[3px] bg-black"></div>
			</div>
			{!isOpen && (
				<Link href="/">
					<span className="uppercase font-bold text-3xl cursor-pointer select-none absolute right-1/2 translate-x-1/2">
						Alz<span>.</span>
						<span className="text-2xl">news</span>
					</span>
				</Link>
			)}

			{/* <MenuItems /> */}
			{/* <ProfileItem /> */}
		</nav>
	);
};

export default MobileNav;
