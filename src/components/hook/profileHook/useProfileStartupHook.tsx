import { useQuery } from "@tanstack/react-query";

const useProfileStartupHook = ({username}:{username:string}) => {
 const {
        isPending,
        error,
        isError,
        data: getProfileStartup,
    } = useQuery({
        queryKey: ["getProfileStartups",username],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/get/startup?username=${username}`,
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

export default useProfileStartupHook