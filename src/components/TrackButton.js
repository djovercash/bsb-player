import React from 'react';

const TrackButton = ({ track = {} }) => {
	return (
		<button className='track'>{track.title}</button>
	)
};

export default TrackButton;
