import { useRef, type Dispatch, type SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import styles from "@/components/modules/css/searchBox/route.module.css";
import styled from "styled-components";
import useClickOutSide from "@/hooks/UseClickOutSide";

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

  useClickOutSide({ isOpen, searchRef, setIsOpen });

  return (
    <SearchDropDown $isOpen={isOpen} ref={searchRef}>
      <section className={styles.searchBox}>
        <div className={styles.searchBox__container}>
          <FiSearch />

          <input
            type={"text"}
            className={styles.searchBox___searchInput}
            placeholder="Search coin, pair, contract address, exchange, or post"
          />
        </div>

        <IoClose
          className="cursor-pointer ml-auto"
          onClick={() => setIsOpen(false)}
        />
      </section>
    </SearchDropDown>
  );
};

export default SearchBox;
