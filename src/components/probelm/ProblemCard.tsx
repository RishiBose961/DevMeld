import { Building2, Clock, User2 } from "lucide-react";
import { Link } from "react-router";
import UsePostHook from "../hook/postHook/UsePostHook";
import TitleLink from "../Link/TitleLink";
import { Badge } from "../ui/badge";


interface Problem {
  title: string;
  description: string;
  requiredtech: string[];
  _id: string;
  postedBy: {
    companyName: string;
    username: string;
  };
}

const ProblemCard = () => {
  const { isPending, getDevRecom } = UsePostHook() as {
    isPending: boolean;
    getDevRecom: Problem[];
  };

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {getDevRecom.map((problem: Problem, index: number) => (
        <>
          <div key={index} className="rounded-xl border border-gray-600 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div>
                  <TitleLink text={problem.title} valuetext={'md'} />

                  <div className="flex items-center space-x-2 mt-1">
                    <Building2 className="w-4 h-4 " />
                    <span className="text-sm ">{problem?.postedBy?.companyName}</span>
                  </div>
                </div>
              </div>

            </div>

            <p className=" text-sm mb-4 line-clamp-2">{problem.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {problem.requiredtech.map((tech: string, i: number) => (
                <Badge
                  key={`${tech}-${i}`}
                  variant="secondary"
                  className="bg-primary-foreground ring-1 text-foreground"
                >
                  {tech}
                </Badge>

              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>12</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User2 className="w-4 h-4" />
                    <span>{problem?.postedBy?.username}</span>
               
                </div>
              </div>

            </div>
            <Link to={`/p/${problem._id}`}>
              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]">
                View Challenge
              </button>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProblemCard;
