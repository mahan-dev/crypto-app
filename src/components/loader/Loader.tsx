import { ThreeDots } from "react-loader-spinner";

interface LoaderProps {
  small?: boolean;
}
const Loader = ({ small }: LoaderProps) => {
  return (
    <ThreeDots
      visible={true}
      height={`${small ? 40 : 80}`}
      width={`${small ? 40 : 80}`}
      color="#ffffff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
