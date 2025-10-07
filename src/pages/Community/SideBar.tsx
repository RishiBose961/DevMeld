import UseCommunityUser from "@/components/hook/communityHook/UseCommunityUser";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCommunityStore from "@/ZustandStore/useCommunityStore";
import OnlineUser from "./OnlineUser";

interface SidebarProps {
  id?: string;
}

const Sidebar = ({ id }: SidebarProps) => {
  const { communityId, setCommunityId } = useCommunityStore(); // get current selected id
  const fallbackId = id ?? "";

  type UserCommunity = {
    _id: string;
    roomname?: string;
  };

  const { isPending, getUserCommunity } = UseCommunityUser(fallbackId) as {
    isPending: boolean;
    getUserCommunity: UserCommunity[];
  };

  function truncateText(text: string, maxLength: number) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="m-3 sm:p-4 backdrop-blur-md rounded-xl bg-card/40 border-t border-border/30">
      <div className="flex flex-col justify-between rounded-2xl">
        <div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 w-32 col-span-2 flex items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Community
            </div>
            <OnlineUser />
          </div>


          <ScrollArea className="h-[750px] mt-4">
            {getUserCommunity?.map((item) => {
              const isSelected = communityId === item._id;
              return (
                <div key={item._id}>
                  <Button
                    onClick={() => setCommunityId(item._id)}
                    variant="ghost"
                    className={`w-full justify-start mb-3 ${isSelected
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "hover:bg-gray-100 bg-card "
                      }`}
                  >
                    <p
                      className={`text-sm break-words ${isSelected ? "font-semibold" : ""
                        }`}
                    >
                      {truncateText(item.roomname ?? "", 30)}
                    </p>
                  </Button>
                </div>
              );
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
