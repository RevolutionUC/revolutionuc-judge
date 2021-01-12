export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Pagination<PaginationObject> {
  readonly items: PaginationObject[];
  readonly meta: PaginationMeta;
}