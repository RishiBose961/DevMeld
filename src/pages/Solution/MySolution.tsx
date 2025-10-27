import useGetSolMyId from "@/components/hook/profileHook/useGetSolMyId";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router";

const MySolution = () => {
    const { id } = useParams();

    const { isPending, getMySol } = useGetSolMyId(id as string) as {
        isPending: boolean; getMySol: Array<{
            language: string;
            code: string;
            createdAt: string;
        }>;
    };

    return (
        <div>
            <h1>My Solution</h1>

            {isPending ? (
                <p>Loading...</p>
            ) : (
                <div className="bg-card rounded-2xl p-2 mt-4">
                    {
                        getMySol && getMySol.length === 0 ? (
                            <p className="p-4">Not found solution</p>
                        ) : (
                            getMySol?.map((solu: { language: string; code: string; createdAt: string; }, index: number) => (
                                <Editor theme="hc-black" key={index} height="50vh" className="p-4" defaultLanguage={solu.language} defaultValue={solu.code} />
                            ))
                        )
                    }

                </div>


            )}


        </div>
    )
}

export default MySolution