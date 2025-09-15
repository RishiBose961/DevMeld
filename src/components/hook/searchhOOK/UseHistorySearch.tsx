import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseHistorySearch = () => {
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
    data: getSearchHistory,
  } = useQuery({
    queryKey: ["getSearchHistorys"],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/history`,
        {
          method: "GET",
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

  return { isPending, search:getSearchHistory?.searchname };
}

export default UseHistorySearch