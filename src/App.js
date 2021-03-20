import React, { Component } from 'react';
import TrackList from './components/TrackList';
import TrackPlayer from './components/TrackPlayer';

import logo from './logo.svg';
import './App.css';

import { fetchApiMusicData } from './services/apiService';
import dataParseService from './services/dataParseService';

class App extends Component {
	state = {
		audioTracks: [],
		currentTrack: {},
		videoTracks: [],
	};

	/**
	* Fetches the api data, parses it, and sets up initial state
	*/
	componentDidMount() {
		fetchApiMusicData()
			.then((data = {}) => {
				const mappedData = dataParseService.mapApiData(data);
				this.setState({
					audioTracks: mappedData.filter((track = {}) => track.mediaUrl && track.medium === 'audio'),
					videoTracks: mappedData.filter((track = {}) => track.mediaUrl && track.medium === 'video'),
				});
			});
	}

	_onTrackChangeCallback = (index = 0) => {;
		const currentTrack = dataParseService.setCurrentTrack([...this.state.audioTracks, ...this.state.videoTracks], index);
		const hasCurrentTrack = !!Object.keys(currentTrack).length;

		this.setState({
			currentTrack,
		});
	}

	render() {
		console.log('STATE: ', this.state)
		return (
			<div className='App'>
				<TrackPlayer currentTrack={this.state.currentTrack} />
				<TrackList
					callbacks={{ trackClickCallback: this._onTrackChangeCallback }}
					tracks={[...this.state.audioTracks, ...this.state.videoTracks]} />
			</div>
		)
	};
}

export default App;
