import React from 'react';

import { IconContext } from 'react-icons';
import { RiDashboard2Fill } from 'react-icons/ri';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoIosJournal } from 'react-icons/io';
import { FaCog } from 'react-icons/fa';

const DashboardAside = () => {
	return (
		<>
			<IconContext.Provider value={{ size: '1.3em' }}>
				<aside className="py-8 px-12 bg-black w-72 h-screen flex flex-col">
					<h2 className="text-white font-bold text-3xl mb-32">ALZ.news</h2>
					<ul className="text-white flex gap-8 font-semibold flex-col">
						<li className="flex items-center gap-5 cursor-pointer">
							<RiDashboard2Fill />
							Dashboard
						</li>
						<li className="flex items-center gap-5 cursor-pointer">
							<IoNewspaperOutline />
							News
						</li>
						<li className="flex items-center gap-5 cursor-pointer">
							<IoIosJournal />
							Journals
						</li>
						<li className="flex items-center gap-5 cursor-pointer">
							<FaCog />
							Settings
						</li>
					</ul>
					<button
						href=""
						className="text-white flex justify-center w-full mt-auto px-4 py-1 bg-red-600 font-semibold rounded-md"
					>
						LOGOUT
					</button>
				</aside>
			</IconContext.Provider>
		</>
	);
};

export default DashboardAside;
