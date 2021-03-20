import React from 'react';
import TrackButton from '../components/TrackButton';

const TrackList = ({ currentNavView = 'audio', currentTracks = [], currentTrackIndex = null, isPaused = false, navCallback = null, trackChangeCallback = null }) => {
	const mediums = ['audio', 'video'];

	return (
		<div className='track-list'>
			<div className='track-list__nav'>
				{mediums.map((medium, key) =>
					<div className={`track-list__nav--item track-list__nav--item-${medium}`} key={key} data-active={medium === currentNavView} onClick={() => navCallback(medium)}>{medium}</div>
				)}
			</div>
			<div className='track-list__tracks'>
				{currentTracks.map((item, key) =>
					<TrackButton track={item} key={key} isActive={item.index === currentTrackIndex} isPaused={isPaused} trackCallback={trackChangeCallback}/>
				)}
			</div>
		</div>
	)
};

export default TrackList;
