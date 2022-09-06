import React, { useContext, useState } from 'react';
import { FaGlobeEurope } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import { Oval } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { format, formatDistance, subDays } from 'date-fns';
import { AllNewsContext } from '../../../context/Context';
import axios from 'axios';

const DashboardNewsForm = ({ currentShownArticle, setIsModalShown }) => {
	const [isSaving, setIsSaving] = useState(false);
	const { articles, setArticles } = useContext(AllNewsContext);
	const [title, setTitle] = useState(currentShownArticle.title);
	const [subtitle, setSubtitle] = useState(currentShownArticle.title);
	const [url, setUrl] = useState(currentShownArticle.url);
	const [publisher, setPublisher] = useState(currentShownArticle.publisher);
	const [publisherUrl, setPublisherUrl] = useState(
		currentShownArticle.publisherUrl
	);

	const [publishDate, setPublishDate] = useState(
		new Date(currentShownArticle.publishDate).toISOString()
	);
	const [updatedAt, setUpdatedAt] = useState(
		new Date(currentShownArticle.updatedAt)
	);
	const [recommended, setRecommended] = useState(
		currentShownArticle.recommended
	);

	// const [publishDate, setPublishDate] = useState(
	// 	currentShownArticle.publishDate.toISOString()
	// );
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
		recommended,
		updatedAt: Date.now(),
	};

	console.log(recommended);

	async function onSubmitForm() {
		try {
			const res = await axios.put('http://localhost:8000/api/news', formData);
			console.log(res);
			if (res.status === 200) {
				setIsSaving(false);
				const newArticles = articles.filter(
					(article) => currentShownArticle.id !== article.id
				);
				setArticles([...newArticles, formData]);
				setUpdatedAt(Date.now());
				console.log('ARTICLE UPDATED');
			} else {
				setIsSaving(false);
				throw new Error(res.status);
			}
		} catch (e) {
			console.log('ERROR');
			console.log(e);
		}
	}

	async function saveOnClick() {
		setIsSaving(true);
		await onSubmitForm();
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
					{formatDistance(subDays(new Date(updatedAt), 0), new Date(), {
						addSuffix: true,
					})}
				</p>
			</div>

			<form className="flex" action="">
				<section className="grid grid-cols-6 gap-x-12">
					<div className="col-span-4">
						<div className="mb-4">
							<h3 className="text-2xl uppercase font-bold mb-2">Title</h3>
							<textarea
								className="w-full"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
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
										value={subtitle}
										onChange={(e) => setSubtitle(e.target.value)}
									/>
								)}
							</h1>
						</div>
						<div className="mb-4">
							<h3 className="text-xl uppercase font-bold mb-2">Publish Date</h3>
							<p>{format(new Date(publishDate), 'dd/MM/yyyy')}</p>
						</div>
						<div className="flex items-center gap-2">
							<label className="font-bold" htmlFor="recommended">
								Recommended:
							</label>
							<input
								type="checkbox"
								id="recommended"
								checked={recommended}
								onChange={() => setRecommended((prevState) => !prevState)}
							/>
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
			<div className="flex gap-4 mt-auto justify-end">
				<button
					className="bg-green-800 text-white font-bold py-1 px-4 rounded-md tracking-wide flex items-center gap-2"
					onClick={saveOnClick}
				>
					SAVE
					{isSaving ? (
						<Oval
							height={15}
							width={15}
							color="#fff"
							ariaLabel="oval-loading"
							strokeWidth={5}
							strokeWidthSecondary={4}
						/>
					) : (
						''
					)}
				</button>
				<button
					className="bg-red-700 text-white font-bold py-1 px-4 rounded-md flex items-center gap-1 justify-center"
					onClick={() => setIsModalShown(false)}
				>
					<IoCloseSharp
						color="white"
						size="1.4em"
						style={{ fontWeight: 'bold' }}
					/>
				</button>
			</div>
		</>
	);
};

export default DashboardNewsForm;
