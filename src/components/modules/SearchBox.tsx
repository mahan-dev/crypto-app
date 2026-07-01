import React, { type Dispatch, type SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import styles from "@/components/modules/css/searchBox/route.module.css";

interface SearchBoxProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = ({ setIsOpen }: SearchBoxProps) => {
  return (
    <section className={styles.searchBox}>
      <div className={styles.searchBox__container}>
        <FiSearch />

        <input
          type={"text"}
          className={styles.searchBox___searchInput}
          placeholder="Search coin, pair, contract address, exchange, or post"
        />
      </div>

      <IoClose className="cursor-pointer ml-auto" onClick={() => setIsOpen(false)} />
    </section>
  );
};

export default SearchBox;
