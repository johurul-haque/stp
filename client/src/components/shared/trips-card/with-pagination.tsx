import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getAllTrips } from '@/lib/api/get-all-trips';
import { TripsCards } from '.';

type PropsType = {
  query: string;
  page: string;
};

export async function TripsCardWithPagination({ query, page }: PropsType) {
  const { data, meta } = await getAllTrips({
    _q: query,
    _page: page,
  });

  const totalPages = Math.ceil(meta.total / meta.limit);

  const nextPage = meta.page + 1;
  const prevPage = meta.page - 1;

  return (
    <>
      <TripsCards data={data} />

      {(meta.total > meta.limit || true) && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!prevPage}
                href={`?page=${prevPage}`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?page=${i + 1}`}
                  isActive={i + 1 === meta.page}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                aria-disabled={nextPage > totalPages}
                href={`?page=${nextPage}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
