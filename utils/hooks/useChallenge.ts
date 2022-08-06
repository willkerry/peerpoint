import useSWR from "swr";

import fetchChallengeExists from "../../lib/fetchers/fetch-challenge-exists";

/** Hook for retrieving existence confirmation and title for a given ID */
const useChallenge = (
  id: number
): {
  exists: boolean;
  title: string;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR({ id }, fetchChallengeExists);
  return {
    exists: data?.exists,
    title: data?.title,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useChallenge;
