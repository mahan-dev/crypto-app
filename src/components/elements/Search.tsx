import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";

import styles from "@/components/elements/styles/search/route.module.css";
import SearchBox from "../modules/SearchBox";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SearchDropDown = styled.div<{ $isOpen: boolean }>`
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};

  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  backdrop-filter: ${(props) => (props.$isOpen ? "blur(0.6px)" : "none")};
  display: flex;
  justify-content: center;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const overFlowHandler = () => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };

  useEffect(() => {
    overFlowHandler();
  }, [isOpen]);

  return (
    <>
      <Button className={styles.searchButton} onClick={clickHandler}>
        <FiSearch />
        <span className="text-[0.8rem]">Search</span>
      </Button>
      <SearchDropDown $isOpen={isOpen}>
        <SearchBox isOpen={isOpen} setIsOpen={setIsOpen} />
      </SearchDropDown>
    </>
  );
};

export default Search;
