import React from 'react';
import Link from 'next/link';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { BiBrain } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const MobileSideBarNav = ({
	alzOpen,
	setAlzOpen,
	demOpen,
	setDemOpen,
	closeNav,
}) => {
	return (
		<>
			<nav className="w-96 left-0 top-0 fixed h-screen py-12 bg-black z-20 shadow-md px-16 text-white flex flex-col">
				<IoMdClose
					onClick={closeNav}
					className="text-white font-bold absolute cursor-pointer text-3xl right-6 top-6 hover:text-gray-400"
				/>
				<Link href="/">
					<div className="uppercase font-bold text-3xl cursor-pointer select-none text-center mb-7">
						Alz<span>.</span>
						<span className="text-2xl">news</span>
					</div>
				</Link>
				<div className="w-full h-[2px] mb-7 bg-white"></div>
				<ul className="font-semibold flex flex-col gap-4 text-lg tracking-widest">
					<Link href="/">
						<li
							onClick={closeNav}
							className="cursor-pointer hover:text-gray-500 flex items-center gap-2 select-none"
						>
							HOME
						</li>
					</Link>
					<Link href="/news">
						<li
							onClick={closeNav}
							className="cursor-pointer hover:text-gray-500"
						>
							NEWS
						</li>
					</Link>
					<li
						onClick={() => setAlzOpen((prev) => !prev)}
						className="cursor-pointer hover:text-gray-500 flex items-center gap-2 select-none"
					>
						ALZHEIMER'S
						{alzOpen ? (
							<AiOutlineCaretDown className="text-sm" />
						) : (
							<AiOutlineCaretRight className="text-sm" />
						)}
					</li>
					{alzOpen && (
						<ul className="pl-4 flex flex-col gap-4 mb-4 text-sm">
							<li onClick={closeNav}>
								<Link
									href="/alzheimers/what-is-alzheimers"
									className="cursor-pointer"
								>
									<a className="flex items-center gap-4 hover:text-gray-400">
										<BiBrain className="text-lg" />
										<p className="">What is Alzheimer's?</p>
									</a>
								</Link>
							</li>

							<li onClick={closeNav}>
								<Link
									href="/alzheimers/know-the-10-signs"
									className="cursor-pointer"
								>
									<a className="flex items-center gap-4 hover:text-gray-400">
										<BiBrain className="text-lg" />
										<p className="">Know the 10 Signs</p>
									</a>
								</Link>
							</li>

							<li onClick={closeNav}>
								<Link href="/alzheimers/treatments" className="cursor-pointer">
									<a className="flex items-center gap-4 hover:text-gray-400">
										<BiBrain className="text-lg" />
										<p>Treatments</p>
									</a>
								</Link>
							</li>
						</ul>
					)}
					<li
						onClick={() => setDemOpen((prev) => !prev)}
						className="cursor-pointer hover:text-gray-500 flex items-center gap-2 select-none"
					>
						DEMENTIA
						{demOpen ? (
							<AiOutlineCaretDown className="text-sm" />
						) : (
							<AiOutlineCaretRight className="text-sm" />
						)}
					</li>
					{demOpen && (
						<ul className="pl-4 flex flex-col gap-4 mb-4 text-sm">
							<li onClick={closeNav}>
								<Link
									href="/dementia/what-is-dementia"
									className="cursor-pointer"
								>
									<a className="flex items-center gap-4 hover:text-gray-400">
										<BiBrain className="text-lg" />
										<p className="">What is Dementia?</p>
									</a>
								</Link>
							</li>
						</ul>
					)}
				</ul>
				<span className="mt-auto text-center">alz.news © 2022</span>
			</nav>
			<div
				onClick={closeNav}
				className="w-screen h-screen fixed bg-black left-0 top-0 z-10 bg-opacity-60"
			></div>
		</>
	);
};

export default MobileSideBarNav;
