export class PaginationInfo {
  numberOfElementsShown: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  curPageNumber: number;
  first: boolean;
  empty: boolean;

  constructor(response: any) {
    if (response) {
      const responsePageable = response.pageable;
      if (responsePageable) {
        this.numberOfElementsShown = responsePageable.offset;
      }
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
      this.last = response.last;
      this.size = response.size;
      this.curPageNumber = response.curPageNumber;
      this.first = response.first;
      this.empty = response.empty;
    }
  }
}
