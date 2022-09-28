import React, { useContext, useRef, useState } from 'react';
import { NewsContext } from '../../../context/NewsContext';

// libraries
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Oval } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { format, formatDistance, subDays, getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import axios from 'axios';

// ICONS
import { FaGlobeEurope, FaTrash } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { FiCheck } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

// COMPONENTS
import ConfirmationPopup from '../../Confirmation/ConfirmationPopup';
import ConfirmationBackdrop from '../../Confirmation/ConfirmationBackdrop';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardNewsForm = ({ currentShownArticle, setIsModalShown }) => {
	const { articles, setArticles } = useContext(NewsContext);
	const [isSaving, setIsSaving] = useState(false);
	const [isEditMode, setIsEditMode] = useState({
		title: false,
		subtitle: false,
		publishDate: false,
		recommended: false,
		publisher: false,
		url: false,
	});
	const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);
	const [title, setTitle] = useState(currentShownArticle.title);
	const [subtitle, setSubtitle] = useState(currentShownArticle.subtitle);
	const [url, setUrl] = useState(currentShownArticle.url);
	const [publisher, setPublisher] = useState(currentShownArticle.publisher);
	const [publisherUrl, setPublisherUrl] = useState(
		currentShownArticle.publisherUrl
	);
	const [publishDate, setPublishDate] = useState(
		new Date(currentShownArticle.publishDate)
	);
	const [updatedAt, setUpdatedAt] = useState(
		new Date(currentShownArticle.updatedAt)
	);
	const [recommended, setRecommended] = useState(
		currentShownArticle.recommended
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
		recommended,
		updatedAt: Date.now(),
	};

	async function onSubmitForm() {
		try {
			const res = await axios.put('http://localhost:8000/api/news', formData);
			console.log(res);
			if (res.status === 200) {
				setIsSaving(false);
				// const newArticles = articles.filter(
				// 	(article) => currentShownArticle.id !== article.id
				// );

				const newArticles = articles.map((article) => {
					return article.id === formData.id ? formData : article;
				});

				// TODO - THIS (LINE 81) IS FREEZING UP THE APPLICATION FOR QUITE SOME TIME WHEN SAVING, HOW DO WE FIX THIS SO THAT OUR DASHBOARD IS STILL SYNCED WITH THE BACKEND, WITHOUT DOING A RELOAD AND WITHOUT CAUSING SUCH A BIG RE-RENDER?
				setArticles(newArticles);
				setUpdatedAt(Date.now());
				toast.success('Article updated!', {
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});
			} else {
				setIsSaving(false);
				toast.error('Something went wrong, try again!', {
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});
				throw new Error(res.status);
			}
		} catch (e) {
			console.log('ERROR');
			console.log(e);
		}
	}

	async function onClickSubmitForm() {
		setIsSaving(true);
		await onSubmitForm();
	}
	async function onDeleteArticle(id, articles, setArticles) {
		try {
			const res = await axios.delete(`http://localhost:8000/api/news/${id}`);

			if (res.status === 200) {
				// removing the article from the articles array
				const newArticles = articles.filter((article) => id !== article.id);
				// setting the articles to be the new articles array
				setArticles(newArticles);
				setIsConfirmationPopup(false);
				setIsModalShown(false);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const titleText = useRef();
	const subTitleText = useRef();
	const publisherRef = useRef([]);

	function activateEditMode(title) {
		switch (title) {
			case 'title':
				setIsEditMode((prevState) => ({ ...prevState, title: true }));
				break;
			case 'subtitle':
				setIsEditMode((prevState) => ({ ...prevState, subtitle: true }));
				break;
			case 'publisher':
				setIsEditMode((prevState) => ({ ...prevState, publisher: true }));
				break;
		}
		// setIsEditMode();
	}
	function deactivateEditMode(title) {
		switch (title) {
			case 'title':
				setIsEditMode((prevState) => ({ ...prevState, title: false }));
				break;
			case 'subtitle':
				setIsEditMode((prevState) => ({ ...prevState, subtitle: false }));
				break;
			case 'publisher':
				setIsEditMode((prevState) => ({ ...prevState, publisher: false }));
				break;
		}
	}

	function onClickAcceptChange(ref, setterFunc, title) {
		setterFunc(ref.current.value);
		deactivateEditMode(title);
	}
	function onClickAcceptChangeArray(ref, setterFunc, title) {
		const array = ref.current.map((el) => el.value);
		setterFunc(array);
		deactivateEditMode(title);
	}

	// props for datepicker component:

	const years = range(1990, getYear(new Date()) + 1, 1);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return (
		<>
			<section className="bg-white px-12 py-6 rounded-lg">
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
					<div className="ml-auto flex gap-4 items-center">
						<FaTrash
							onClick={() => setIsConfirmationPopup(true)}
							className="cursor-pointer"
						/>
						{isConfirmationPopup && (
							<ConfirmationBackdrop>
								<ConfirmationPopup
									setIsConfirmationPopup={setIsConfirmationPopup}
									onDeleteArticle={onDeleteArticle}
									articles={articles}
									setArticles={setArticles}
									id={currentShownArticle.id}
								/>
							</ConfirmationBackdrop>
						)}

						<p className="italic flex text-sm">
							<p className="not-italic font-bold inline-block">
								Last edited: &nbsp;
							</p>
							{formatDistance(subDays(new Date(updatedAt), 0), new Date(), {
								addSuffix: true,
							})}
						</p>
					</div>
				</div>

				<form className="flex">
					<section className="grid w-full grid-cols-4 gap-x-12">
						<div className="col-span-2">
							<div className="mb-4">
								{isEditMode.title ? (
									<>
										<h3 className="text-2xl uppercase font-bold mb-2">Title</h3>

										<div className="flex items-start gap-2">
											<TextareaAutosize
												autoFocus
												className="w-full p-1"
												minRows={1}
												maxRows={20}
												// onBlur={(e) => deactivateEditMode(e)}
												// onChange={(e) => setTitle(e.target.value)}
												defaultValue={title}
												// value={title}
												ref={titleText}
											/>
											<button
												onClick={() =>
													onClickAcceptChange(titleText, setTitle, 'title')
												}
												className="bg-green-800 hover:bg-green-700 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<FiCheck />
											</button>
											<button
												onClick={() => deactivateEditMode('title')}
												className="bg-red-700 hover:bg-red-600 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<IoCloseSharp />
											</button>
										</div>
									</>
								) : (
									<>
										<div className="flex gap-2 items-center">
											<h3 className="text-2xl uppercase font-bold mb-2">
												title
											</h3>
											<BiEdit
												onClick={(e) => activateEditMode('title')}
												size="1.2em"
												className="cursor-pointer hover:text-zinc-700"
											/>
										</div>
										<p>{title}</p>
									</>
								)}
							</div>
							<div className="mb-4">
								{isEditMode.subtitle ? (
									<>
										<h3 className="text-2xl uppercase font-bold mb-2">
											subtitle
										</h3>

										<div className="flex items-start gap-2">
											<TextareaAutosize
												className="w-full"
												autoFocus
												minRows={1}
												maxRows={20}
												// onBlur={(e) => deactivateEditMode(e)}
												// onChange={(e) => setTitle(e.target.value)}
												defaultValue={subtitle}
												// value={title}
												ref={subTitleText}
											/>
											<button
												onClick={() =>
													onClickAcceptChange(
														subTitleText,
														setSubtitle,
														'subtitle'
													)
												}
												className="bg-green-800 hover:bg-green-700 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<FiCheck />
											</button>
											<button
												onClick={(e) => deactivateEditMode('subtitle')}
												className="bg-red-700 hover:bg-red-600 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<IoCloseSharp />
											</button>
										</div>
									</>
								) : (
									<>
										<div className="flex gap-2 items-center">
											<h3 className="text-2xl uppercase font-bold mb-2">
												subtitle
											</h3>
											<BiEdit
												onClick={(e) => activateEditMode('subtitle')}
												size="1.2em"
												className="cursor-pointer hover:text-zinc-700"
											/>
										</div>
										<p>{subtitle}</p>
									</>
								)}
							</div>
							<div className="flex gap-2 items-center">
								<h3 className="text-xl uppercase font-bold mb-2">
									Publish Date
								</h3>
							</div>
							<DatePicker
								renderCustomHeader={({
									date,
									changeYear,
									changeMonth,
									decreaseMonth,
									increaseMonth,
									prevMonthButtonDisabled,
									nextMonthButtonDisabled,
								}) => (
									<div
										style={{
											margin: 10,
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<button
											onClick={decreaseMonth}
											disabled={prevMonthButtonDisabled}
										>
											{'<'}
										</button>
										<select
											value={getYear(date)}
											onChange={({ target: { value } }) => changeYear(value)}
										>
											{years.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>

										<select
											value={months[getMonth(date)]}
											onChange={({ target: { value } }) =>
												changeMonth(months.indexOf(value))
											}
										>
											{months.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>

										<button
											onClick={increaseMonth}
											disabled={nextMonthButtonDisabled}
										>
											{'>'}
										</button>
									</div>
								)}
								className="cursor-pointer italic mb-4"
								selected={publishDate}
								onChange={(date) => setPublishDate(date)}
								dateFormat="dd/MM/yyyy"
							/>
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
								{isEditMode.publisher ? (
									<>
										<h4 className="text-xl uppercase font-bold mb-2">
											PUBLISHER
										</h4>
										<div className="flex items-end gap-2">
											<div className="flex flex-col gap-2">
												{publisher.map((el, i) => (
													<input
														key={i}
														ref={(ref) => (publisherRef.current[i] = ref)}
														className={`text-sm w-[200px]`}
														defaultValue={el}
													/>
												))}
											</div>
											<button
												onClick={() =>
													onClickAcceptChangeArray(
														publisherRef,
														setPublisher,
														'publisher'
													)
												}
												className="bg-green-800 hover:bg-green-700 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<FiCheck />
											</button>
											<button
												onClick={() => deactivateEditMode('publisher')}
												className="bg-red-700 hover:bg-red-600 text-white py-1 px-4 text-lg flex items-center justify-center"
											>
												<IoCloseSharp />
											</button>
										</div>
									</>
								) : (
									<>
										<div className="flex gap-2 items-center">
											<h4 className="text-xl uppercase font-bold mb-2">
												PUBLISHER
											</h4>
											<BiEdit
												onClick={(e) => activateEditMode('publisher')}
												size="1.2em"
												className="cursor-pointer hover:text-zinc-700"
											/>
										</div>
										{!publisher ? (
											<p className="bg-[#FDEBEB] text-[#F14546] rounded-full px-3 font-bold py-1 inline-block mb-4">
												MISSING
											</p>
										) : (
											<div className="mb-4">
												{publisher.map((el, index) => (
													<p className="text-sm">{el}</p>
												))}
											</div>
										)}
									</>
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
				<div className="flex gap-4 mt-auto justify-end relative">
					<button
						onClick={onClickSubmitForm}
						className="bg-green-800 text-white font-bold py-1 px-4 rounded-md tracking-wide flex items-center gap-2 hover:bg-green-700 duration-200"
					>
						SAVE
						{isSaving && (
							<Oval
								height={15}
								width={15}
								color="#fff"
								ariaLabel="oval-loading"
								strokeWidth={5}
								strokeWidthSecondary={4}
							/>
						)}
					</button>
					<button
						className="bg-red-700 text-white font-bold py-1 px-4 rounded-md flex items-center gap-1 justify-center hover:bg-red-600"
						onClick={() => setIsModalShown(false)}
					>
						<IoCloseSharp
							color="white"
							size="1.4em"
							style={{ fontWeight: 'bold' }}
						/>
					</button>
				</div>
			</section>
		</>
	);
};

export default DashboardNewsForm;
