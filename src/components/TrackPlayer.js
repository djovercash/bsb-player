import React, { Component } from 'react';

class TrackPlayer extends Component {
	/**
	 * Creates a new player element
	 * @param {Object} currentTrack The current track selected by the user
	 * @return {JSX} The new player element
	 */
	createPlayer(currentTrack = {}) {
		const CustomTag = currentTrack.medium || 'audio';
		const tagType = currentTrack.medium === 'video' ? 'video/mp4' : 'audio/x-m4a';

		return (
			<CustomTag name={currentTrack.medium || 'audio'} >
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
			</div>
		);
	}
}

export default TrackPlayer;
