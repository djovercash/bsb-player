import { backupData } from '../data/apiBackupData';

const apiEndPoint = 'https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json';

/**
 * Calls api endpoint to retrieve api data.
 * If call fails, use back up data and console error the failure
 * @return {Object} An object that holds a tracks array
 */
export const fetchApiMusicData = () => (
	fetch(apiEndPoint)
		.then((res) => res.json())
		.catch((error = {}) => {
			console.error('Error Fetching Data. Using in repo data: ', error)
			return backupData;
		})
);
