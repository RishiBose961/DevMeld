import { useQuery } from "@tanstack/react-query";

const UseStartupProfile = ({id}:{id:string}) => {
 const {
        isPending,
        error,
        isError,
        data: getProfileStartup,
    } = useQuery({
        queryKey: ["getProfileStartups",id],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/get/startup/posts?id=${id}`,
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
        getProfileStartup,
    };
}

export default UseStartupProfile