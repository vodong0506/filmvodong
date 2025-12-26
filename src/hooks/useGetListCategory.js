import useSWR from "swr";
import { getCategories } from "../service/category-service";

const useGetListCategory = () => {
  const { data, mutate, isLoading, error } = useSWR(
    "categories",
    getCategories,
    {
      dedupingInterval: 60 * 1000, // 60s
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return {
    data: data || [],
    handleGetList: mutate,
    isLoading,
    error,
  };
};

export default useGetListCategory;
