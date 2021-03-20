/**
 * Sets what type of medium the track belongs to
 * @param {string} mediaUrl The url source for the media element
 * @return {string} Either 'video' or 'audio' based on media's source string
 */
const setDataMediumType = (mediaUrl = '') => ((mediaUrl || '').includes('video.itunes') ? 'video' : 'audio');

/**
 * Parses the individual api data track items
 * @param {Object} item The api track item
 * @param {number} index The index passed in through the array map function
 * @return {Object} The parsed track item
 */
const createTrackItem = (item = {}, index = 0) => {
	if (!(item || {}).mediaUrl) {
		return {};
	}

	return {
		image: item.imageUrl || '',
		index: index + 1,
		mediaUrl: item.mediaUrl || '',
		medium: setDataMediumType(item.mediaUrl),
		title: item.title || '',
	}
}

/**
 * Sorts two items based on a passed in value
 * @param {string} itemOneValue The first value to compare
 * @param {string} itemTwoValue The second value to compare
 * @return {number} Either -1, 0, or 1
 */
const sortByValue = (itemOneValue = '', itemTwoValue = '') => (
	(itemOneValue > itemTwoValue) - (itemOneValue < itemTwoValue)
);

/**
 * Takes data from api call and parses it
 * @param {Object} apiData The data returned from the api call
 * @return {Object[]} An array of parsed track items
 */
const mapApiData = (apiData = {}) => {
	const safetyCheckedArray = Array.isArray((apiData || {}).tracks) ? apiData.tracks : [];

	// Ideally we could refactor the API call so the data is already sorted from the backend
	return safetyCheckedArray.sort((trackOne = {}, trackTwo = {}) => sortByValue((trackOne || {}).title, (trackTwo || {}).title))
		.sort((trackOne = {}, trackTwo = {}) => sortByValue(setDataMediumType((trackOne || {}).mediaUrl), setDataMediumType((trackTwo || {}).mediaUrl)))
		.map((track = {}, index = 0) => createTrackItem(track, index));
};

module.exports = {
	mapApiData,
};
