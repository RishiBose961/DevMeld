import { useQuery } from "@tanstack/react-query";

const useProfileDevHook = ({username}:{username:string}) => {
 const {
        isPending,
        error,
        isError,
        data: getProfileDev,
    } = useQuery({
        queryKey: ["getProfileDevs",username],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/get/developers?username=${username}`,
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
        getProfileDev,
    };
}

export default useProfileDevHook