import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";

import styles from "@/components/elements/styles/search/route.module.css";
import SearchBox from "../modules/SearchBox";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SearchDropDown = styled.div<{ $isOpen: boolean }>`
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.$isOpen ? "0" : "-100%")});
  transition: opacity 0.4s ease;
  backdrop-filter: blur(0.6px);
  display: flex;
  margin-top: ${(props) => (props.$isOpen ? "4.6rem" : "-100%")};

  justify-content: center;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
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
        <SearchBox setIsOpen={setIsOpen} />
      </SearchDropDown>
    </>
  );
};

export default Search;
