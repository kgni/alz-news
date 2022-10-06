import React from 'react';
import Link from 'next/link';

const SideBarNavAlzheimers = ({ path }) => {
	console.log(path);
	const pathArray = path.split('/');
	const lastSegmentPath = pathArray[pathArray.length - 1];
	console.log(lastSegmentPath);
	return (
		<nav className=" border-r-2 w-42 border-black px-8">
			<ul className="text-black font-semibold flex flex-col gap-4">
				<Link href="/">
					<li className="cursor-pointer">
						<a>What is Alzheimer's Disease?</a>
					</li>
				</Link>
				<Link href="/">
					<li className="cursor-pointer">
						<a>How is Alzheimer's Disease Diagnosed?</a>
					</li>
				</Link>
				<Link href="/">
					<li className="cursor-pointer">
						<a> Know the 10 Signs</a>
					</li>
				</Link>
				<Link href="/">
					<li className="cursor-pointer">
						<a>Treatments</a>
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default SideBarNavAlzheimers;
