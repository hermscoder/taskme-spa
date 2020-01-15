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
      this.curPageNumber = response.number + 1;
      this.first = response.first;
      this.empty = response.empty;
    }
  }

  toString(): string {
    return '' + this.numberOfElementsShown +
    ' totalElements' + this.totalElements +
    ' totalPages' + this.totalPages +
    ' last' + this.last +
    ' size' + this.size +
    ' curPageNumber' + this.curPageNumber +
    ' first' + this.first;
  }
}
