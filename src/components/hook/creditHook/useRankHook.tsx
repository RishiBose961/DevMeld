import { useQuery } from "@tanstack/react-query";


const useRankHook = () => {
    
    const {
        isPending,
        error,
        isError,
        data: getRankData,
    } = useQuery({
        queryKey: ["getRankDatas"],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/get/all/credits`,
                {
                    method: "GET",
                }
            ).then((res) => res.json());
        },
       
    });

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return {
        isPending,
        getRankData,
    };
}

export default useRankHook