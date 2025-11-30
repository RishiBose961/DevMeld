import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseReportBan = () => {
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
    data: blockBan,
  } = useQuery({
    queryKey: ["blockBans",user?._id],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/check/${user?._id}`,
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

  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, blockBan };
}

export default UseReportBan