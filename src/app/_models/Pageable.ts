export class Pageable {
  page: number;
  linesPerPage: number;
  orderBy: string;
  direction: string;


  buildRequestParamString(): string {
    let result = '';
    result += this.page != null ? 'page=' + this.page : null;
    result += this.linesPerPage != null ? 'linesPerPage=' + this.linesPerPage : null;
    result += this.orderBy != null ? 'orderBy=' + this.orderBy : null;
    result += this.direction != null ? 'direction=' + this.direction : null;
    return result;
  }
}

