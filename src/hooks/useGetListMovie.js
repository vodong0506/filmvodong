import useSWR from "swr";
import { getListMovie } from "../service/movie-service";

const useGetListMovie = () => {
  const { data, mutate, isLoading, error } = useSWR("movies", getListMovie, {
    dedupingInterval: 60 * 1000, // 60s
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    data: data || [],
    handleGetList: mutate,
    isLoading,
    error,
  };
};

export default useGetListMovie;
