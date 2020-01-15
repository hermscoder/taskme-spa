export class Pageable {
  page: number;
  linesPerPage: number;
  orderBy: string;
  direction: string;
  term: string;

  buildRequestParamString(): string {
    let result = '';
    result += this.page ? 'page=' + this.page : '';
    result += this.linesPerPage ? 'linesPerPage=' + this.linesPerPage : '';
    result += this.orderBy ? 'orderBy=' + this.orderBy : '';
    result += this.direction ? 'direction=' + this.direction : '';
    result += this.term ? 'term=' + this.term : '';
    return result;
  }
}

