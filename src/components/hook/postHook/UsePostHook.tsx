import { getAllPosts } from "@/services/postapi";
import { useQuery } from "@tanstack/react-query";


const UsePostHook = () => {
  const {
    isPending,
    error,
    isError,
    data: getDevRecom,
  } = useQuery({
    queryKey: ["getAllpost"],
    queryFn: getAllPosts,
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return {
    isPending,
    getDevRecom,
  };
};

export default UsePostHook;