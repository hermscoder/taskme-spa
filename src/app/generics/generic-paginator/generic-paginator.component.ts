import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';
import { GPaginator } from 'src/app/_interfaces/GPaginator';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';


@Component({
  selector: 'app-generic-paginator',
  templateUrl: './generic-paginator.component.html',
  styleUrls: ['./generic-paginator.component.css']
})
export class GenericPaginatorComponent implements OnInit {
  @Input() pageable: Pageable;
  @Input() paginationInfo: PaginationInfo;
  @Output() loadContent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onNextPage() {
    if (this.pageable) {
      this.pageable.page++;
    }
    this.loadContent.emit(this.pageable);
  }
}
