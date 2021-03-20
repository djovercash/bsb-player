import React from 'react';

const TrackButton = ({ track = {}, trackClickCallback = null }) => {
	return (
		<button className='track' onClick={() => trackClickCallback(track.index)}>{track.title}</button>
	)
};

export default TrackButton;
