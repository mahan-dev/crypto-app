import Skeleton from 'react-loading-skeleton';

const HeaderSkeleton = () => {
  return (
    <div className="">
      <Skeleton
        className="bg-gray-600 "
        width={'100%'}
        height={135}
        highlightColor="#444"
        duration={1.2}
      />
    </div>
  );
};
export default HeaderSkeleton;
