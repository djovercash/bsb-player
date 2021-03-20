import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import { fetchApiMusicData } from './services/apiService';
import dataParseService from './services/dataParseService';

class App extends Component {

	/**
	* Fetches the api data and parses it
	*/
	componentDidMount() {
		fetchApiMusicData()
			.then((data = {}) => {
				const mappedData = dataParseService.mapApiData(data);
				console.log('MAPPED DATA: ', mappedData);
			});
	}

	render() {
		return (
			<div className='App'></div>
		)
	};
}

export default App;
