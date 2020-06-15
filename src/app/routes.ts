import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

import { TaskSomeoneDetailComponent } from './tasks/task-someone-detail/task-someone-detail.component';
import { TaskSomeoneDetailResolver } from './_resolvers/task-someone-detail.resolver';

import { TaskSomeoneComponent } from './task-someone/task-someone.component';

import { CreatedTasksComponent } from './tasks/created-tasks/created-tasks.component';

import { TaskMeComponent } from './task-me/task-me.component';

import { TaskApplicationsComponent } from './tasks/task-applications/task-applications.component';
import { TaskApplicationsResolver } from './_resolvers/task-applications.resolver';
import { CreatedTasksResolver } from './_resolvers/created-tasks.resolver';

import { MessagesComponent } from './messages/page/messages.component';
import { MessagesResolver } from './_resolvers/messages.resolver';

import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';

import { AuthGuard } from './_guards/auth.guard';
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
      { path: 'createdTasks/:title', component: CreatedTasksComponent, resolve: {taskSomeoneList: CreatedTasksResolver} },
      { path: 'createdTasks', component: CreatedTasksComponent },
      { path: 'taskMe', component: TaskMeComponent },
      { path: 'taskApplications', component: TaskApplicationsComponent, resolve: {taskApplications: TaskApplicationsResolver} },
      { path: 'messages/:participantName', component: MessagesComponent, resolve: {user: MessagesResolver} },
      { path: 'messages', component: MessagesComponent, resolve: {user: MessagesResolver} },
      { path: 'user/edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    ]
   },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

