import { useQuery } from "@tanstack/react-query";

const UsePlaygroundHook = ({ value }: { value: string }) => {

    const {
        isPending,
        error,
        isError,
        data: getPlayground,
    } = useQuery({
        queryKey: ["getPlaygrounds", value],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/playgrounds/${value}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            ).then((res) => res.json());
        },
        enabled: !!value,

    });

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return { isPending, getPlayground };
}

export default UsePlaygroundHook