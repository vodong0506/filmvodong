import useSWR from "swr";
import { getMovieById } from "../service/movie-service";

const useGetDetailMovie = (id) => {
  const { data, isLoading, mutate } = useSWR(
    id ? ["movie-detail", id] : null,
    () => getMovieById(id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 1000,
    }
  );

  return {
    data,
    isLoading,
    refresh: mutate,
  };
};

export default useGetDetailMovie;
