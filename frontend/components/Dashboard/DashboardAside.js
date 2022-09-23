import React from 'react';

import { IconContext } from 'react-icons';
import { RiDashboard2Fill } from 'react-icons/ri';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoIosJournal } from 'react-icons/io';
import { FaCog, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';

const DashboardAside = ({ currentPage, setCurrentPage }) => {
	function onClickSetCurrentPage(event) {
		// simply just returning if the page you clicked is already the currentPage (by doing this we are preventing that we are re-rendering if it is not necessary) - Not should if this should be kept, cause we might wanna do the refresh when clicking on the already selected page?
		if (event.target.innerText.toLowerCase() === currentPage) {
			return;
		}

		switch (event.target.innerText.toLowerCase()) {
			case 'dashboard':
				setCurrentPage('dashboard');
				break;
			case 'news':
				setCurrentPage('news');
				break;
			case 'journals':
				setCurrentPage('journals');
				break;
			case 'settings':
				setCurrentPage('settings');
				break;
		}
	}

	return (
		<>
			<IconContext.Provider value={{ size: '1.3em' }}>
				<aside className="py-8 px-12 bg-black w-72 h-screen flex flex-col flex-shrink-0">
					<Link href="/">
						<h2 className="text-white font-bold text-3xl mb-32 cursor-pointer">
							ALZ.news
						</h2>
					</Link>
					<ul className="text-zinc-600 flex gap-8 font-semibold flex-col">
						<li
							onClick={onClickSetCurrentPage}
							className={`${
								currentPage === 'dashboard' ? 'text-white' : ''
							} flex items-center gap-5 cursor-pointer hover:text-white duration-100 select-none`}
						>
							<RiDashboard2Fill />
							Dashboard
						</li>
						<li
							onClick={onClickSetCurrentPage}
							className={`${
								currentPage === 'news' ? 'text-white' : ''
							} flex items-center gap-5 cursor-pointer hover:text-white duration-100 select-none`}
						>
							<IoNewspaperOutline />
							News
						</li>
						<li
							onClick={onClickSetCurrentPage}
							className={`${
								currentPage === 'journals' ? 'text-white' : ''
							} flex items-center gap-5 cursor-pointer hover:text-white duration-100 select-none`}
						>
							<IoIosJournal />
							Journals
						</li>
						<li
							onClick={onClickSetCurrentPage}
							className={`${
								currentPage === 'settings' ? 'text-white' : ''
							} flex items-center gap-5 cursor-pointer hover:text-white duration-100 select-none`}
						>
							<FaCog />
							Settings
						</li>
					</ul>
					<div className="mt-auto">
						<div
							onClick={() => setCurrentPage('settings')}
							className="flex mb-12 gap-4 items-center cursor-pointer select-none"
						>
							<div className="rounded-full flex p-6 bg-white">
								{/* <FaUserAlt color="white" size="1.4em" /> */}
							</div>
							<div>
								<p className="text-zinc-200 text-sm font-semibold tracking-wider">
									kgni
								</p>
								<p className="text-zinc-500 font-semibold text-xs tracking-wider">
									Admin
								</p>
							</div>
						</div>
						<button
							href="/"
							className="text-white flex justify-center w-full px-4 py-1 bg-red-800 font-semibold rounded-md hover:bg-red-700 duration-100 select-none"
						>
							LOGOUT
						</button>
					</div>
				</aside>
			</IconContext.Provider>
		</>
	);
};

export default DashboardAside;
