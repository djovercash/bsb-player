import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header';
import TrackPlayer from './components/TrackPlayer';
import TrackList from './components/TrackList';

import dataParseService from './services/dataParseService';
import { fetchApiMusicData } from './services/apiService';

class App extends Component {
	state = {
		audioTracks: [],
		currentTrack: {},
		currentNavView: 'audio',
		hasNext: false,
		hasPrev: false,
		isPlaying: false,
		isPaused: false,
		videoTracks: [],
	};

	/**
	 * Fetches the api data, parses it, and sets the current state
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

	/**
	 * Callback for current track change
	 * @param {number} index The index for the current track item
	 * @param {boolean} trackSelected True if a specific track was selected
	 * @param {boolean} autoplayTrackChange True if previous track ended and we are auto loading the next one
	 */
	_onTrackChangeCallback = (index = 0, trackSelected = false, autoplayTrackChange = false) => {
		const mediaArray = this.state[`${autoplayTrackChange ? this.state.currentTrack.medium : this.state.currentNavView}Tracks`];
		const currentTrack = dataParseService.setCurrentTrack(mediaArray, index);
		const hasCurrentTrack = !!Object.keys(currentTrack).length;

		this.setState({
			currentNavView: hasCurrentTrack ? currentTrack.medium : 'audio',
			currentTrack,
			hasNext: hasCurrentTrack ? dataParseService.setTrackPointer(mediaArray, index, true) : false,
			hasPrev: hasCurrentTrack ? dataParseService.setTrackPointer(mediaArray, index, false) : false,
			isPlaying: hasCurrentTrack && (trackSelected || !this.state.isPaused),
			isPaused: trackSelected ? false : this.state.isPaused,
		})
	}

	/**
	 * Callback for the view changing with the navigation
	 * @param {string} medium The medium now in view
	 */
	_onNavClickCallback = (medium = '') => {
		this.setState({ currentNavView: medium });
	}

	/**
	 * Callback for the play/pause button
	 */
	_onPlayClickCallback = () => {
		if (!Object.keys(this.state.currentTrack || {}).length) {
			this._onTrackChangeCallback((this.state[`${this.state.currentNavView}Tracks`][0] || {}).index);
		} else {
			this.setState({ isPlaying: !this.state.isPlaying, isPaused: !this.state.isPaused });
		};
	};

	render() {
		return (
			<div className='container'>
				<Header />
				<div className='container__components'>
					<TrackPlayer
						currentTrack={this.state.currentTrack}
						isPlaying={this.state.isPlaying}
						isPaused={this.state.isPaused}
						hasNext={this.state.hasNext}
						hasPrev={this.state.hasPrev}
						playCallback={this._onPlayClickCallback}
						trackChangeCallback={this._onTrackChangeCallback} />
					<TrackList
						currentNavView={this.state.currentNavView}
						currentTracks={this.state[`${this.state.currentNavView}Tracks`]}
						currentTrackIndex={this.state.currentTrack.index || null}
						isPaused={this.state.isPaused}
						trackChangeCallback={this._onTrackChangeCallback}
						navCallback={this._onNavClickCallback} />
				</div>
			</div>
		);
	}
}

export default App;
