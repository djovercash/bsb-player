import React, { Component } from 'react';

class TrackPlayer extends Component {
	state = {
		player: React.createRef(),
	};

	/**
	 * Update the player each time this component receives an update
	 * @param {Object} prevState The previous state of this component
	 */
	componentDidUpdate(prevState = {}) {
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
			<CustomTag name={currentTrack.medium || 'audio'} ref={this.state.player} onEnded={() => this.props.trackChangeCallback(this.props.currentTrack.index + 1, false, true)}>
				<source src={currentTrack.mediaUrl || ''} type={tagType}/>
			</CustomTag>
		)
	}

	/**
	 * Sets the inline styles for the track player
	 * @param {Object} currentTrack The current track to be played
	 * @return {Object} The new player element
	 */
	setPlayerStyles(currentTrack = {}) {
		if ((currentTrack || {}).image) {
			return { backgroundImage: `url("${currentTrack.image}")` };
		}

		return {};
	}

	/**
	 * Sets the classes for the player buttons
	 * @param {string} buttonType The type of button
	 * @param {boolean} isActive True when active
	 * @return {string} The classes for the individual button
	 */
	setButtonClasses(buttonType = '', isActive = false) {
		let buttonClasses = 'track-player__control';

		return ['next', 'prev'].includes(buttonType) ? `${buttonClasses} track-player__control--${isActive ? 'active' : 'disabled'}` : buttonClasses;
	}

	render() {
		const styles = this.setPlayerStyles(this.props.currentTrack);
		const isPlaying = this.props.isPlaying ? 'pause' : 'play';

		return (
			<div className='track-player'>
				<div className='track-player__media' style={styles}>
					{this.createPlayer(this.props.currentTrack || {})}
				</div>
				<h3 className='track-player__title'>{(this.props.currentTrack || {}).title || 'Select a track from the playlist or hit "Play"'}</h3>
				<div className='track-player__controls'>
					<button className={this.setButtonClasses('prev', this.props.hasPrev)} onClick={() => this.props.trackChangeCallback(this.props.currentTrack.index - 1)}>Previous</button>
					<button className={this.setButtonClasses('play')} onClick={() => this.props.playCallback()}>{isPlaying}</button>
					<button className={this.setButtonClasses('next', this.props.hasNext)} onClick={() => this.props.trackChangeCallback(this.props.currentTrack.index + 1)}>Next</button>
				</div>
			</div>
		);
	}
}

export default TrackPlayer;
