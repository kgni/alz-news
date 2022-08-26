import React from 'react';

import { AiFillCaretDown } from 'react-icons/ai';

// React skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardHeaderSkeleton = () => {
	return (
		<header className="flex gap-8">
			<div className="bg-zinc-100 py-4 px-8 rounded-lg w-1/5">
				<h3 className="font-bold text-3xl mb-4">Articles</h3>
				<Skeleton height={20}>4000</Skeleton>
			</div>
			<div className="bg-zinc-100 py-4 px-8 rounded-lg w-1/5">
				{' '}
				<h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
					Added last week{' '}
					<AiFillCaretDown
						style={{ marginTop: '5px', cursor: 'pointer' }}
						size="0.8em"
					/>
				</h3>
				<Skeleton height={20}>4000</Skeleton>
			</div>
			<div></div>
			<div></div>
		</header>
	);
};

export default DashboardHeaderSkeleton;
