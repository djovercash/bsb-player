import React from 'react';

const TrackButton = ({ track = {}, isActive = false, isPaused = false, trackCallback = null }) => {
	const trackClassName = `track track-${isActive ? `active__${isPaused ? 'paused' : 'playing'}` : 'disabled'}`;

	return (
		<button className={trackClassName} onClick={() => trackCallback(track.index, true)}>{track.title}</button>
	)
};

export default TrackButton;
