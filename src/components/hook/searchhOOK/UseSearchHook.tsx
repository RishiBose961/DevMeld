import { useQuery } from '@tanstack/react-query';

const UseSearchHook = (querySearch: string) => {
   const {
    isPending,
    error,
    isError,
    data: getSearch,
  } = useQuery({
    queryKey: ["getAllpost",querySearch],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/search?query=${querySearch}`,
        {
          method: "POST",
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
    getSearch,
  };
}

export default UseSearchHook