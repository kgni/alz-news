import React from 'react';

const ConfirmationPopup = ({ id, onDeleteArticle, setIsConfirmationPopup }) => {
	return (
		<div className="bg-white p-4 rounded-md">
			<p className="mb-6 text-center text-xl">
				Are you sure you want to delete this article{' '}
				<span className="font-bold underline">permanently</span>?
			</p>
			<div className="flex gap-4">
				<button
					className="bg-green-800 text-white font-bold py-1 px-4 rounded-md tracking-wide flex items-center gap-2 hover:bg-green-700 grow justify-center"
					onClick={() => onDeleteArticle(id)}
				>
					YES
				</button>{' '}
				<button
					className="bg-red-700 text-white font-bold py-1 px-4 rounded-md flex items-center gap-1 justify-center hover:bg-red-600 grow"
					onClick={() => setIsConfirmationPopup(false)}
				>
					NO
				</button>
			</div>
		</div>
	);
};

export default ConfirmationPopup;
