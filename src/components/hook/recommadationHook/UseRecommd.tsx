import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseRecommd = () => {
 const { user, isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getRecommad,
  } = useQuery({
    queryKey: ["getRecommads"],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/feed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ).then((res) => res.json());
    },
    enabled: isAuthenticated,
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, getRecommad };
}

export default UseRecommd