import useSWR, { SWRResponse } from "swr";
import getter from "../lib/getter";

const useChallenge = (
  id: number
): {
  exists: boolean;
  isLoading: boolean;
  isError: Error;
} => {
  const { data, error }: SWRResponse<{ exists?: boolean }> = useSWR(
    `/api/c/exists/${!id ? 0 : id}`,
    getter
  );
  return {
    exists: data?.exists,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useChallenge;
