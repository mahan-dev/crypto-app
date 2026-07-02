import {
  useEffect,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

interface UseClickProps {
  isOpen: boolean;
  searchRef: RefObject<HTMLDivElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

const useClickOutSide = ({
  isOpen,
  searchRef,
  setIsOpen,
  setSearch,
}: UseClickProps) => {

  
  useEffect(() => {
    if (!isOpen) return;
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (target && searchRef.current && !searchRef.current.contains(target)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [isOpen, setIsOpen, searchRef, setSearch]);
};

export default useClickOutSide;
