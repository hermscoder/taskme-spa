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
  pageable: Pageable;
  @Input() paginationInfo: PaginationInfo;
  @Output() loadContent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.pageable = new Pageable();
  }

  filterData() {
    this.loadContent.emit(this.pageable);
  }
  nextPage() {
    if (!this.pageable) {
      this.pageable = new Pageable();
      this.pageable.page = 0;
    }
    this.pageable.page++;
    console.log(this.paginationInfo);
    this.loadContent.emit(this.pageable);
  }

  previousPage() {
    if (!this.pageable) {
      this.pageable = new Pageable();
      this.pageable.page = 0;
    }
    this.pageable.page--;
    this.loadContent.emit(this.pageable);
  }

  firstPage() {
    if (!this.pageable) {
      this.pageable = new Pageable();
    }
    this.pageable.page = 0;
    this.loadContent.emit(this.pageable);
  }

  lastPage() {
    if (!this.pageable) {
      this.pageable = new Pageable();
    }
    this.pageable.page = this.paginationInfo.totalPages - 1;
    this.loadContent.emit(this.pageable);
  }
}
