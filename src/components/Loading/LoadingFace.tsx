import { ProjectCardSkeleton } from "./project-card-skeleton";

const LoadingFace = ({ value ,gridvalue}: { value: number ,gridvalue:number}) => {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-${gridvalue} mt-3 mb-5`}>
      {Array.from({ length: value }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingFace;