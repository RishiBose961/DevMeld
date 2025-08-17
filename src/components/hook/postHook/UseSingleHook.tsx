import { useQuery } from "@tanstack/react-query";

const UseSingleHook = (recerid: string) => {
 
  const {
    isPending,
    error,
    isError,
    data: getSingleData,
  } = useQuery({
    queryKey: ["getSingleDatae", recerid],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/post/${recerid}`,
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

  return { isPending, getSingleData };
};

export default UseSingleHook;
