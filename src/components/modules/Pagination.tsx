import type { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../@/components/ui/pagination";

import { UsePage } from "@/hooks/usePage";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const PaginationPage = ({ page, setPage }: PaginationProps) => {
  const nextHandler = () => {
    if (page === 10) return;

    UsePage(+1, setPage);
  };
  const backHandler = () => {
    if (page === 1) return;
    UsePage(-1, setPage);
  };

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const value = +e.currentTarget.innerText;
    UsePage(value, setPage, true);
  };

  return (
    <Pagination className="bg-black w-fit mx-auto rounded-md my-4">
      <PaginationContent className="[&_a]:cursor-pointer">
        <>
          <PaginationItem>
            <PaginationPrevious onClick={backHandler} />
          </PaginationItem>
          <PaginationItem onClick={clickHandler}>
            <PaginationLink
              className={`${page === 1 ? "text-black" : ""}`}
              isActive={page === 1 ? true : false}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={clickHandler}>
            <PaginationLink
              className={`${page === 2 ? "text-black" : ""}`}
              isActive={page === 2 ? true : false}
            >
              2
            </PaginationLink>
          </PaginationItem>
        </>

        {page > 2 && page < 9 && (
          <>
            <PaginationEllipsis />
            <PaginationItem onClick={clickHandler}>
              <PaginationLink
                className={`${page ? "text-black" : ""}`}
                isActive
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationEllipsis />
        <PaginationItem onClick={clickHandler}>
          <PaginationLink
            className={`${page === 9 && "text-black"}`}
            isActive={page === 9}
          >
            9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={clickHandler}>
          <PaginationLink
            className={`${page === 10 && "text-black"}`}
            isActive={page === 10}
          >
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={nextHandler} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationPage;
