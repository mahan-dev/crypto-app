import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../@/components/ui/pagination";

interface PaginationProps {
  page: number;
}
const PaginationPage = ({ page }: PaginationProps) => {
  
  return (
    <Pagination className="bg-black w-fit mx-auto rounded-md my-4">
      <PaginationContent>
        {
          <>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
          </>
        }

        {page > 2 && page < 9 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
          </>
        )}
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationPage;
