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
  @Input() test: string;
  @Output() loadContent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  nextPage() {
    if (this.pageable) {
      this.pageable.page++;
    } else {
      this.pageable = new Pageable();
      this.pageable.page = 0;
    }
    console.log(this.pageable);
    this.loadContent.emit(this.pageable);
  }

  previousPage() {
    if (this.pageable) {
      this.pageable.page--;
    } else {
      this.pageable = new Pageable();
      this.pageable.page = 0;
    }
    this.loadContent.emit(this.pageable);
  }
}
