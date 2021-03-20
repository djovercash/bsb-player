import React, { Component } from 'react';

class TrackPlayer extends Component {
	state = {
		player: React.createRef(),
	};

	/**
	 * Update the player each time this component receives an update
	 * @param {Object} prevState The previous state of this component
	 */
	componentDidUpdate(prevState) {
		if (Object.keys(this.props.currentTrack || {}).length) {
			// If the track index changed or if the readyState is not ready, load the media
			if (prevState.currentTrack.index !== this.props.currentTrack.index || !this.state.player.current.readyState) {
				this.state.player.current.load();
			}

			if (this.props.isPlaying) {
				this.state.player.current.play();
			} else {
				this.state.player.current.pause();
			}

		}
	}

	/**
	 * Creates a new player element
	 * @param {Object} currentTrack The current track selected by the user
	 * @return {JSX} The new player element
	 */
	createPlayer(currentTrack = {}) {
		const CustomTag = currentTrack.medium || 'audio';
		const tagType = currentTrack.medium === 'video' ? 'video/mp4' : 'audio/x-m4a';

		return (
			<CustomTag name={currentTrack.medium || 'audio'} ref={this.state.player} >
				<source src={currentTrack.mediaUrl || ''} type={tagType}/>
			</CustomTag>
		)
	}

	render() {
		return (
			<div className='track-player'>
				<div className='track-player__media'>
					{this.createPlayer(this.props.currentTrack || {})}
				</div>
				<h3 className='track-player__title'>{(this.props.currentTrack || {}).title || 'Select a track from the playlist or hit "Play"'}</h3>
				<div className='track-player__controls'>
					<button className='track-player__control'>Previous</button>
					<button className='track-player__control' onClick={() => this.props.callbacks.playClickCallback()}>Play</button>
					<button className='track-player__control'>Next</button>
				</div>
			</div>
		);
	}
}

export default TrackPlayer;
