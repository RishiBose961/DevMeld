import { useQuery } from "@tanstack/react-query";

const UseTimeLineHook = ({timelineid}:{timelineid:string}) => {

  const {
    isPending,
    error,
    isError,
    data: getTimeLine,
  } = useQuery({
    queryKey: ["getTimeLines",timelineid],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/sub/dev/${timelineid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
    },

  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, getTimeLine };
}

export default UseTimeLineHook