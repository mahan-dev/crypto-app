import Skeleton from "react-loading-skeleton";

const HeaderSkeleton = () => {
  return (
    <div className="flex gap-2 ">
      <Skeleton className="bg-gray-600" width={250} height={135} highlightColor="#444" duration={1.2} />
      <Skeleton className="bg-gray-600" width={250} height={135} highlightColor="#444" duration={1.2} />
      <Skeleton className="bg-gray-600" width={250} height={135} highlightColor="#444" duration={1.2} />
    </div>
  );
};
export default HeaderSkeleton;
