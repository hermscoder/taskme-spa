import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  tasks: TaskSomeone[] = [];
  filteredTasks: TaskSomeone[] = [];
  pageable: Pageable;
  paginationInfo: PaginationInfo;
  test = 'abacate';
  // we changed this to private, because we want to execute something everytime we change the value
  // of the property on the screen. So now with the getter and setter we can do this
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredTasks = this.filterTasks(value);
  }

  filterTasks(searchString: string) {
    return this.tasks.filter( task => task.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
                                  || task.description.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskSomeoneService.listTasks().subscribe((tasks: TaskSomeone[]) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    }, error => {
      this.alertify.error(error.message);
    });
  }

  listWithPagination(pageable: Pageable) {
    this.taskSomeoneService.listWithPagination(pageable).subscribe((page: any[]) => {
      this.test = 'blablabla';
      this.tasks = page['content'];
      this.filteredTasks = this.tasks;
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }

}
