export interface IPaginationLink {
  next: string
}

export interface IPagination {
  count: number,
  total: number,
  perPage: number,
  currentPage: number,
  totalPages: number
  links: IPaginationLink
}
