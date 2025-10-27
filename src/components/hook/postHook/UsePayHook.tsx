import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UsePayHook = ({postId}:{postId:string}) => {
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
    data: getPays,
  } = useQuery({
    queryKey: ["getPayss",postId],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/get/${postId}`,
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

  return { isPending, getPays };
}

export default UsePayHook