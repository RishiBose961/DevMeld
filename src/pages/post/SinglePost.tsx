/* eslint-disable @typescript-eslint/no-explicit-any */
import UseSingleHook from "@/components/hook/postHook/UseSingleHook";
import TitleLink from "@/components/Link/TitleLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, Code, Star, Users } from "lucide-react";
import { Link, useParams } from "react-router";
const SinglePost = () => {
  const { id } = useParams();

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
        <div className="bg-white p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2 text-gray-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Time Estimate</span>
          </div>
          <p className="font-semibold text-gray-900">{getSingleData?.duaration}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2 text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Submissions</span>
          </div>
          <p className="font-semibold text-gray-900">0/{getSingleData?.noofparticipants}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border dark:border-gray-200 border-gray-600">
          <div className="flex items-center space-x-2 text-orange-600 mb-1">
            <Star className="w-4 h-4" />
            <span className="text-sm">Reward</span>
          </div>
          <p className="font-semibold text-gray-900">{getSingleData?.credits} credits</p>
        </div>
      </div>

      <Tabs defaultValue="description">
        <TabsList className="flex border border-gray-800 dark:border-gray-600  w-full bg-transparent">
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
        </TabsList>
        <TabsContent value="description">
          <div>
            <h3 className="text-lg font-semibold mb-3">Problem Description</h3>
            <p className=" leading-relaxed">{getSingleData.description}</p>
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
            <h4 className="font-medium  mb-2 mt-5">What You'll Gain</h4>

            <ul className="space-y-1 ">
              {getSingleData.whatyouwillgain.map((tech: string) => (
                <li>• {tech}</li>
              ))}
            </ul>
            <Link
              to={`/code-solution/${getSingleData._id}/post/${getSingleData.postedBy._id}`}
              className="flex items-center space-x-2 mt-5"
            >
              <button className="bg-primary flex text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/80 transition-colors">
                 <Code className="mx-3"/>Let me solve this  
              </button>
            </Link>
           
          </div>
        </TabsContent>
        <TabsContent value="submission">
          Change your submission here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SinglePost;
