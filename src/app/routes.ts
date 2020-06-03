import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { TaskSomeoneComponent } from './task-someone/task-someone.component';
import { TaskMeComponent } from './task-me/task-me.component';
import { CreatedTasksComponent } from './tasks/created-tasks/created-tasks.component';
import { MessagesComponent } from './messages/page/messages.component';

import { AuthGuard } from './_guards/auth.guard';
import { TaskSomeoneDetailComponent } from './tasks/task-someone-detail/task-someone-detail.component';
import { TaskSomeoneDetailResolver } from './_resolvers/task-someone-detail.resolver';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'findTasks', component: ListTasksComponent },
      { path: 'taskDetails/:id', component: TaskSomeoneDetailComponent, resolve: {taskSomeone: TaskSomeoneDetailResolver} },
      { path: 'taskSomeone', component: TaskSomeoneComponent },
      { path: 'createdTasks', component: CreatedTasksComponent },
      { path: 'taskMe', component: TaskMeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'user/edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    ]
   },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

