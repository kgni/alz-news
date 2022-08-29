import React, { useState } from 'react';
import { FaGlobeEurope } from 'react-icons/fa';
import { formatDistance, subDays } from 'date-fns';

import axios from 'axios';

const DashboardNewsForm = ({ currentShownArticle }) => {
	const [isSaving, setIsSaving] = useState(false);

	const [title, setTitle] = useState(currentShownArticle.title);
	const [subtitle, setSubtitle] = useState(currentShownArticle.title);
	const [url, setUrl] = useState(currentShownArticle.url);
	const [publisher, setPublisher] = useState(currentShownArticle.publisher);
	const [publisherUrl, setPublisherUrl] = useState(
		currentShownArticle.publisherUrl
	);
	const [publishDate, setPublishDate] = useState(
		currentShownArticle.publishDate
	);
	const [type, setType] = useState(currentShownArticle.type);

	const [status, setStatus] = useState(currentShownArticle.status);
	const formData = {
		id: currentShownArticle.id,
		title,
		subtitle,
		url,
		publisher,
		publisherUrl,
		publishDate,
		type,
		status,
	};

	async function onSubmitForm() {
		try {
			setIsSaving(true);
			const res = await axios.put('http://localhost:8000/api/news', formData);
			if (!res.ok) {
				throw new Error(res.status);
			} else {
				setIsSaving(false);
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<div className="flex items-center gap-4 mb-8 border-b-[1px] pb-3">
				<p className="font-bold">{currentShownArticle.id}</p>
				{status === 'PENDING' && (
					<span
						onClick={() => setStatus('APPROVED')}
						className="p-1 px-4 bg-[#FEF8E8] text-[#F4C745] font-bold text-xs rounded-full flex items-center gap-1 w-[100px] justify-center cursor-pointer select-none"
					>
						{status}
					</span>
				)}

				{status === 'APPROVED' && (
					<span
						onClick={() => setStatus('REJECTED')}
						className="p-1 px-4 bg-[#EBF9EB] text-[#3EC13D] font-bold text-xs rounded-full flex items-center gap-1 w-[100px] justify-center cursor-pointer select-none"
					>
						{status}
					</span>
				)}

				{status === 'REJECTED' && (
					<span
						onClick={() => setStatus('PENDING')}
						className="p-1 px-4 bg-[#FDEBEB] text-[#F14546] font-bold text-xs rounded-full flex items-center justify-center gap-1 w-[100px] cursor-pointe select-none cursor-pointer"
					>
						{status}
					</span>
				)}

				<a className="" href={currentShownArticle.url} target="_blank">
					<FaGlobeEurope />
				</a>
				<p className="italic ml-auto flex text-sm">
					<p className="not-italic font-bold inline-block">
						Last edited: &nbsp;
					</p>
					{formatDistance(
						subDays(new Date(currentShownArticle.updatedAt), 0),
						new Date(),
						{
							addSuffix: true,
						}
					)}
				</p>
			</div>

			<form action="">
				<section className="grid grid-cols-6 gap-x-12">
					<div className="col-span-4">
						<div className="mb-4">
							<h3 className="text-2xl uppercase font-bold mb-2">Title</h3>
							<textarea className="w-full" value={currentShownArticle.title} />
						</div>
						<div className="mb-4">
							<h3 className="text-2xl uppercase font-bold mb-2">Subtitle</h3>
							<h1>
								{!currentShownArticle.subtitle ? (
									<p className="bg-[#FDEBEB] text-[#F14546] rounded-full px-3 font-bold py-1 inline-block">
										MISSING
									</p>
								) : (
									<textarea
										className="w-full max-h-72"
										value={currentShownArticle.subtitle}
									/>
								)}
							</h1>
						</div>
					</div>
					<div className="col-span-2">
						<div className="mb-4">
							<h4 className="text-xl uppercase font-bold mb-2">PUBLISHER</h4>

							{!currentShownArticle.publisher ? (
								<p className="bg-[#FDEBEB] text-[#F14546] rounded-full px-3 font-bold py-1 inline-block">
									MISSING
								</p>
							) : (
								<div className="flex gap-4 justify-start items-center">
									{currentShownArticle.publisher.map((el) => (
										<input type="text" className="text-sm" value={el} />
									))}
								</div>
							)}
						</div>
						<div className="mb-4">
							<h4 className="text-xl uppercase font-bold mb-2">URL</h4>
							<h1>
								{!currentShownArticle.url ? (
									<p className="bg-[#FDEBEB] text-[#F14546] rounded-full px-3 font-bold py-1 inline-block">
										MISSING
									</p>
								) : (
									<input
										type="text"
										className="w-full text-blue-400 text-sm truncate ..."
										value={currentShownArticle.url}
									/>
								)}
							</h1>
						</div>
					</div>
				</section>
			</form>
		</>
	);
};

export default DashboardNewsForm;
