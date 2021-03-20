import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import { fetchApiMusicData } from './services/apiService';

class App extends Component {

	/**
	* Fetch the api data and sets the current state
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
