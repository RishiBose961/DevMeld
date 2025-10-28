import UsePlaygroundHook from "@/components/hook/playgroundHook/UsePlaygroundHook";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const PlayGround = ({ postId }: { postId: string }) => {
  const navigate = useNavigate();
  const { isPending, getPlayground } = UsePlaygroundHook({ value: postId }) as {
    isPending: boolean;
    getPlayground: {
      _id: string;
      playgroundName: string;
      language: string;
      userId: { username: string };
      createdAt: string;
    }[];

  }

  const joinRoom = (roomName: string) => {
    navigate(`/playground/${roomName}`);
  };

  return (
    <div>
      {isPending ? (
        <div>Loading Playground...</div>
      ) : (
        <div className=" grid grid-cols-3 gap-2 mt-4">
          {
            getPlayground?.map((playground: { _id: string; playgroundName: string; language: string; userId: { username: string }; createdAt: string }) => (
              <div
                key={playground._id}
                className="mb-4 p-4 border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {playground.playgroundName || "Untitled Playground"}
                  </h3>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {playground.language || "Unknown"}
                  </span>
                </div>


                <p className="text-xs text-muted-foreground mt-2">
                  {playground.userId.username || "Anonymous"} | {playground.createdAt.slice(0, 10)}
                </p>
                <Button className="mt-2" onClick={() => joinRoom(playground.playgroundName)}>Join</Button>
              </div>
            ))
          }
        </div>



      )}
    </div>
  );
};

export default PlayGround;
