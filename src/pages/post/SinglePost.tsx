/* eslint-disable @typescript-eslint/no-explicit-any */
import UseSingleHook from "@/components/hook/postHook/UseSingleHook";
import UseSubmited from "@/components/hook/validhook/UseSubmited";
import TitleLink from "@/components/Link/TitleLink";
import CountSubmission from "@/components/probelm/CountSubmission";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, Code, Star, Users } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";
import MySolution from "../Solution/MySolution";
import JoinPay from "@/components/Secure/JoinPay";
import { CreatePlayground } from "../PlayGround/CreatePlayground";
import { useEffect, useState } from "react";

const SinglePost = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "description"; // default tab

  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    // Sync state with URL param
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value }); // Update URL param
  };

  const { isPending: loading, getValidSubmit } = UseSubmited(id as string) as {
    isPending: boolean;
    getValidSubmit: any;
  };

  const { isPending, getSingleData } = UseSingleHook(id as string) as {
    isPending: boolean;
    getSingleData: any;
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="space-y-6 mx-2 mt-2">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div>
              <TitleLink text={getSingleData?.title} valuetext={"2xl"} />
              <div className="flex items-center space-x-2 mt-1">
                <Building2 className="w-4 h-4 " />
                <span>{getSingleData?.postedBy?.companyName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2  mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Time Estimate</span>
          </div>
          <p className="font-semibold ">{getSingleData?.duaration}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2  mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Submissions</span>
          </div>
          <div className="font-semibold flex ">
            <CountSubmission topic={getSingleData?._id} />/
            {getSingleData?.noofparticipants}
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2 text-orange-600 mb-1">
            <Star className="w-4 h-4" />
            <span className="text-sm">Reward</span>
          </div>
          <p className="font-semibold ">{getSingleData?.credits} credits</p>
        </div>
      </div>

      {/* Tabs with URL sync */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="flex border border-gray-800 dark:border-gray-600 w-full bg-transparent">
          <TabsTrigger
            value="description"
            className="relative px-4 py-2 text-gray-600 data-[state=active]:text-blue-600 font-medium
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300
            data-[state=active]:after:w-full"
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="submission"
            className="relative px-4 py-2 text-gray-600 data-[state=active]:text-blue-600 font-medium
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300
            data-[state=active]:after:w-full"
          >
            My Submissions
          </TabsTrigger>

          <TabsTrigger
            value="playground"
            className="relative px-4 py-2 text-gray-600 data-[state=active]:text-blue-600 font-medium
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300
            data-[state=active]:after:w-full"
          >
            Playground
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <div>
            <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
            <p className="leading-relaxed">{getSingleData.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2 mt-4">Required Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {getSingleData.requiredtech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 mt-5">What You'll Gain</h4>
            <ul className="space-y-1 ">
              {getSingleData.whatyouwillgain.map((tech: string) => (
                <li key={tech}>• {tech}</li>
              ))}
            </ul>

            {loading ? (
              <div>Loading...</div>
            ) : getValidSubmit?.value ? (
              <div className="mt-5 p-4 bg-green-100 text-green-800 ring-1 rounded-lg">
                You have already submitted a solution for this problem.
                <Link to={`/solution/${getSingleData._id}`}>
                  <Button variant="link" className="cursor-pointer">
                    View Solution
                  </Button>
                </Link>
              </div>
            ) : new Date(getSingleData?.duaration) > new Date() ? (
              getSingleData?.pay === "Free" ? (
                <Link
                  to={`/code-solution/${getSingleData._id}/post/${getSingleData.postedBy._id}`}
                  className="flex items-center space-x-2 mt-5"
                >
                  <button className="bg-primary flex text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/80 transition-colors">
                    <Code className="mx-3" />
                    Let me solve this
                  </button>
                </Link>
              ) : (
                <JoinPay
                  id={getSingleData.postedBy._id}
                  postid={getSingleData._id}
                  pay={getSingleData.pay}
                />
              )
            ) : (
              <div className="mt-5 p-4 bg-red-100 text-red-800 ring-1 rounded-lg">
                The submission time for this problem has expired, you can still
                view the solution.
                <Link to={`/solution/${getSingleData._id}`}>
                  <Button variant="link" className="cursor-pointer">
                    View Solution
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="submission">
          <MySolution />
        </TabsContent>

        <TabsContent value="playground">
          <CreatePlayground postId={getSingleData._id} />
          <p>Playground</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SinglePost;
