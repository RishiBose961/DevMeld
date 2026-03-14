
import { useQuery } from "@tanstack/react-query";


const UseNewPost = () => {
  const {
    isPending,
    error,
    isError,
    data: newPosts,
  } = useQuery({
    queryKey: ["newPosts"],
  queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/newposts`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return {
    isPending,
    newPosts,
  };
};

export default UseNewPost;