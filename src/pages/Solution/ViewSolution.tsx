import UseSolutionHook from "@/components/hook/postHook/UseSolutionHook";
import { useParams } from "react-router";
import Editor from '@monaco-editor/react';
import { Badge } from "@/components/ui/badge";
import NoFoundSol from "./NoFoundSol";
const ViewSolution = () => {
  const { id } = useParams();

  const { isPending, getSoluInfo } = UseSolutionHook({ topic: id ?? "" }) as {
    isPending: boolean;
    getSoluInfo: Array<{
      userId: {
        fullName: string;
        username: string;
      };
      language: string;
      code: string;
      createdAt: string;
    }>;
  }

  return (
    <div>
      <h1 className="text-xl uppercase mx-3 mt-2">View Solution</h1>

      <div>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <>
            {getSoluInfo?.length === 0 ? (
              <NoFoundSol/>
            ) : (
              getSoluInfo?.map((solu: { userId: { fullName: string; username: string }; language: string; code: string; createdAt: string; }, index: number) => (
                <div key={index} className="my-2 mx-4 bg-card rounded-2xl">
                  <div className="px-4 pt-4 flex justify-between">
                    <div>
                      <p>{solu.userId.fullName}</p>
                      <p>{solu.userId.username}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="font-bold uppercase">{solu.language}</Badge>
                    </div>

                  </div>

                  <Editor  theme="hc-black" height="50vh" className="p-4" defaultLanguage={solu.language} defaultValue={solu.code} />
                  <p className="px-4 pb-3">{solu.createdAt.split("T")[0]}</p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ViewSolution