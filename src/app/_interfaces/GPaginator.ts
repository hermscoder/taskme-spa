import { Observable } from "rxjs";
import { Pageable } from "../_models/Pageable";

export interface GPaginator {

  listWithPagination(pageable: Pageable, term: string): Observable<any[]>;
}
