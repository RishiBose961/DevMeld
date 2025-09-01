import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseSubmited = (recerid: string) => {
    
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
    data: getValidSubmit,
  } = useQuery({
    queryKey: ["getValidSubmite", recerid],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/sub/by/${recerid}`,
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

  return { isPending, getValidSubmit };
};

export default UseSubmited;
