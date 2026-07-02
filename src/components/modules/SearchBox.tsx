import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import styles from "@/components/modules/css/searchBox/route.module.css";
import styled from "styled-components";
import useClickOutSide from "@/hooks/UseClickOutSide";
import { searchCoinApi } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";
import CoinResults from "./CoinResults";

interface SearchBoxProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const SearchDropDown = styled.div<{ $isOpen: boolean }>`
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.$isOpen ? "4.6rem" : "-20px")});
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  height: fit-content;
`;
const SearchBox = ({ setIsOpen, isOpen }: SearchBoxProps) => {
  const searchRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState<string>("");

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["searchCoin", debouncedSearch],
    queryFn: async () => await searchCoinApi(debouncedSearch),
  });

  useClickOutSide({ isOpen, searchRef, setIsOpen, setSearch });

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (value.trim() === "") return;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  console.log(data);

  return (
    <SearchDropDown $isOpen={isOpen} ref={searchRef} className="max-sm:w-[90%]">
      <section className={styles.searchBox}>
        <div className={styles.searchBox__container}>
          <FiSearch />

          <input
            type={"text"}
            className={styles.searchBox___searchInput}
            onChange={changeHandler}
            value={!isOpen ? "" : search}
            placeholder="Search coin, pair, contract address, exchange, or post"
          />

          <IoClose
            className="cursor-pointer ml-auto"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {data && <CoinResults data={data} />}
      </section>
    </SearchDropDown>
  );
};

export default SearchBox;
