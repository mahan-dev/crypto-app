import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <Button className="bg-[#484848] w-50 justify-start  p-2 flex gap-2 items-center rounded-md cursor-pointer ">
      <FiSearch />
      <span className="text-[0.8rem]">Search</span>
    </Button>
  );
};

export default Search;
