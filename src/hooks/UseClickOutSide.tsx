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
}

const useClickOutSide = ({ isOpen, searchRef, setIsOpen }: UseClickProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (target && searchRef.current && !searchRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [isOpen, setIsOpen, searchRef]);
};

export default useClickOutSide;
