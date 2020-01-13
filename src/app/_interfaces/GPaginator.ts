import { Observable } from "rxjs";
import { Pageable } from "../_models/Pageable";

export interface GPaginator {

  listWithPagination(pageable: Pageable): Observable<any[]>;
}
