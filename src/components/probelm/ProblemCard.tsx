import { Building2, HandCoins, HandHeart, User2 } from "lucide-react";
import { Link } from "react-router";
import UsePostHook from "../hook/postHook/UsePostHook";
import TitleLink from "../Link/TitleLink";
import LoadingFace from "../Loading/LoadingFace";
import CompanyProfie from "../profie/CompanyProfie";
import { Badge } from "../ui/badge";


interface Problem {
  pay: number;
  credits: number;
  title: string;
  description: string;
  requiredtech: string[];
  _id: string;
  postedBy: {
    companyName: string;
    username: string;
    _id: string;
  };
}

const ProblemCard = () => {
  const { isPending, getDevRecom } = UsePostHook() as {
    isPending: boolean;
    getDevRecom: Problem[];
  };


  if (isPending) {
    return <>
      <LoadingFace value={6} gridvalue={3} />
    </>;
  }
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {getDevRecom.map((problem: Problem, index: number) => (
        <div
          key={index}
          className="rounded-xl bg-card border border-gray-600 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div>
                <TitleLink text={problem.title} valuetext={"md"} />

                <div className="flex items-center space-x-2 mt-1">
                  <Building2 className="w-4 h-4 " />
                  <CompanyProfie postid={problem._id} value={problem.postedBy.companyName} id={problem.postedBy._id} />
                </div>
              </div>
            </div>
          </div>

          <p className=" text-sm mb-4 line-clamp-2">{problem.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {problem.requiredtech.map((tech: string, i: number) => (
              <Badge key={`${tech}-${i}`} variant="secondary" className="bg-primary-foreground ring-1 text-foreground">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm mb-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center text-amber-500 space-x-1">
                <HandCoins className="size-5.5 " aria-hidden />
                <span className="sr-only">Select Join Using Points</span>
                <span className="font-medium">{problem.pay ?? 0}</span>
              </div>
              <div className="flex text-rose-400 items-center space-x-1">
                <HandHeart className="size-5.5 " aria-hidden />
                <span className="sr-only">Credits:</span>
                <span className="font-medium">{problem.credits ?? 0}</span>
              </div>
              
            </div>
            <Link to={`/startup/${problem?.postedBy?.username}`}>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors">
                <User2 className="size-5.5" />
                <span>{problem?.postedBy?.username}</span>
              </div>
            </Link>
          </div>

          <Link to={`/p/${problem._id}`}>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]">
              View Challenge
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProblemCard;
