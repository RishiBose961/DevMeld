import { useQuery } from "@tanstack/react-query";

interface UseCountSubmissionProps {
    topic: string;
}

const UseCountSubmission = ({ topic }: UseCountSubmissionProps) => {
    
    const {
        isPending,
        error,
        isError,
        data: getCountSubmission,
    } = useQuery({
        queryKey: ["getCountSubmissions"],
        queryFn: async () => {
            return await fetch(
                `http://localhost:5000/api/count/${topic}`,
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
        getCountSubmission,
    };
}

export default UseCountSubmission