import UseCountSubmission from "../hook/count/UseCountSubmission"

const CountSubmission = (topic: { topic: string } ) => {
    

    const { isPending,getCountSubmission } = UseCountSubmission(topic) as {
        isPending: boolean;
        getCountSubmission: number
    }

    if (isPending) return <div>Loading...</div>;

    return (
        <div>{getCountSubmission}</div>
    )
}

export default CountSubmission