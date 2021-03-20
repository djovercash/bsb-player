import React from 'react';
import TrackButton from '../components/TrackButton';

const TrackList = ({ tracks = {} }) => {
	const mediums = ['audio', 'video'];

	return (
		<div className='track-list'>
			<div className='track-list__nav'>
				{mediums.map((medium, key) =>
					<div className={`track-list__nav--item track-list__nav--item-${medium}`} key={key}>{medium}</div>
				)}
			</div>
			<div className='track-list__tracks'>
				{tracks.map((track, key) =>
					<TrackButton track={track} key={key}/>
				)}
			</div>
		</div>
	)
};

export default TrackList;
