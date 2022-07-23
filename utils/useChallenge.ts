import useSWR, { SWRResponse } from "swr";
import getter from "../lib/getter";

const useChallenge = (
  id: number
): {
  exists: boolean;
  title: string;
  isLoading: boolean;
  isError: Error;
} => {
  const { data, error }: SWRResponse<{ exists?: boolean; title?: string }> =
    useSWR(`/api/c/exists/${!id ? 0 : id}`, getter);
  return {
    exists: data?.exists,
    title: data?.title,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useChallenge;
