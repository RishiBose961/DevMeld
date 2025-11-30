import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseBlockHook = ({postId}:{postId:string}) => {
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
    data: blockdata,
  } = useQuery({
    queryKey: ["blockdatas",postId,user?._id],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/check/${postId}/${user?._id}`,
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

  return { isPending, blockdata };
}

export default UseBlockHook