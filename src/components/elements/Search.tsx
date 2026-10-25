import { Button } from '@/components/ui/button';
import { FiSearch } from 'react-icons/fi';

import styles from '@/components/elements/styles/search/route.module.css';
import SearchBox from '../modules/SearchBox';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const SearchDropDown = styled.div<{ $isOpen: boolean }>`
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};

  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  backdrop-filter: ${(props) => (props.$isOpen ? 'blur(0.6px)' : 'none')};
  display: flex;
  justify-content: center;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
`;

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const overFlowHandler = () => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    // if(e.is)
    const isSearchShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    if (!isSearchShortcut) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }
    e.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    overFlowHandler();
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <>
      <Button className={styles.searchButton} onClick={clickHandler}>
        <FiSearch />
        <span className="text-[0.8rem]">Search</span>
        <div className={styles.shortcut}>Ctrl+k</div>
      </Button>
      <SearchDropDown $isOpen={isOpen}>
        <SearchBox isOpen={isOpen} setIsOpen={setIsOpen} ref={inputRef} />
      </SearchDropDown>
    </>
  );
};

export default Search;
