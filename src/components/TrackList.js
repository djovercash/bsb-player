import React from 'react';
import TrackButton from '../components/TrackButton';

const TrackList = ({ callbacks = {}, currentNavView = 'audio', tracks = {} }) => {
	const mediums = ['audio', 'video'];
	return (
		<div className='track-list'>
			<div className='track-list__nav'>
				{mediums.map((medium, key) =>
					<div
						className={`track-list__nav--item track-list__nav--item-${medium}`}
						key={key}
						data-active={medium === currentNavView}
						onClick={() => callbacks.navClickCallback(medium)}>{medium}</div>
				)}
			</div>
			<div className='track-list__tracks'>
				{tracks.map((track, key) =>
					<TrackButton track={track} key={key} trackClickCallback={callbacks.trackClickCallback}/>
				)}
			</div>
		</div>
	)
};

export default TrackList;
