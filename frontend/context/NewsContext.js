import { React, createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
export const NewsContext = createContext({});

const NewsContextProvider = ({ children }) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axios.get();

		return () => {
			second;
		};
	}, []);

	return <NewsContext.Provider>{children}</NewsContext.Provider>;
};

export default NewsContextProvider;
