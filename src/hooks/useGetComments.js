import useSWR from "swr";
import { getCommentsByMovieId } from "../service/comment-service";

const useGetComments = (movieId) => {
  const { data, isLoading, mutate } = useSWR(
    movieId ? ["comments", movieId] : null,
    () => getCommentsByMovieId(movieId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 1000,
    }
  );

  return {
    data: data || [],
    isLoading,
    refresh: mutate,
  };
};

export default useGetComments;


