export class Pageable {
  page: number = 0;
  linesPerPage: number;
  orderBy: string;
  direction: string;
  searchTerm: string;
  adicionalFilters: Map<string, any> = new Map();

  buildRequestParamString(): string {
    let result = '';
    result += this.page ? 'page=' + this.page : '';
    result += this.linesPerPage ? 'linesPerPage=' + this.linesPerPage : '';
    result += this.orderBy ? 'orderBy=' + this.orderBy : '';
    result += this.direction ? 'direction=' + this.direction : '';
    result += this.searchTerm ? 'searchTerm=' + this.searchTerm : '';

    this.adicionalFilters.forEach((value: string, key: string) => {
      result += value ? (key + '=' + value) : '';
    });

    return result;
  }
}

