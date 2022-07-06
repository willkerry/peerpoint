/**
 * Wait for a given amount of time.
 */
const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
