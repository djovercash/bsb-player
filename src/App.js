import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import { fetchApiMusicData } from './services/apiService';

class App extends Component {

	/**
	* Fetches the api data
	*/
	componentDidMount() {
		fetchApiMusicData()
			.then((data = {}) => console.log('D: ', data));
	}

	render() {
		return (
			<div className='App'></div>
		)
	};
}

export default App;
