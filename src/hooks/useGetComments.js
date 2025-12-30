import useSWR from "swr";
import { getCommentsByMovieId } from "../service/comment-service";

const useGetComments = (movieId) => {
  const { data, isLoading, mutate } = useSWR(
    movieId ? ["comments", movieId] : null,
    () => getCommentsByMovieId(movieId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 0, //  quan trọng
    }
  );

  return {
    data: data || [],
    isLoading,
    refresh: () => mutate(), // KHÔNG await
  };
};

export default useGetComments;
