import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

import { TaskSomeoneDetailComponent } from './tasks/task-someone-detail/task-someone-detail.component';
import { TaskSomeoneDetailResolver } from './_resolvers/task-someone-detail.resolver';

import { TaskSomeoneComponent } from './task-someone/task-someone.component';

import { CreatedTasksComponent } from './tasks/created-tasks/created-tasks.component';
import { CreatedTasksResolver } from './_resolvers/created-tasks.resolver';

import { TaskApplicationsComponent } from './tasks/task-applications/task-applications.component';
import { TaskApplicationsResolver } from './_resolvers/task-applications.resolver';

import { PunctualTasksComponent } from './tasks/punctual-tasks/punctual-tasks.component';
import { PunctualTasksResolver } from './_resolvers/punctual-tasks.resolver';

import { MessagesComponent } from './messages/page/messages.component';
import { MessagesResolver } from './_resolvers/messages.resolver';

import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';

import { MainPageComponent } from './main-page/main-page.component';

import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TaskAgendaComponent } from './tasks/task-agenda/task-agenda.component';
import { TaskAgendaResolver } from './_resolvers/task-agenda.resolver';



export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'mainPage', component: MainPageComponent },
      { path: 'findTasks', component: ListTasksComponent },
      { path: 'taskDetails/:id', component: TaskSomeoneDetailComponent, resolve: {taskSomeone: TaskSomeoneDetailResolver} },
      { path: 'taskSomeone', component: TaskSomeoneComponent },
      { path: 'createdTasks/:title', component: CreatedTasksComponent, resolve: {taskSomeoneList: CreatedTasksResolver} },
      { path: 'createdTasks', component: CreatedTasksComponent },
      { path: 'taskApplications/:taskTitle', component: TaskApplicationsComponent, resolve: {taskApplications: TaskApplicationsResolver} },
      { path: 'taskApplications', component: TaskApplicationsComponent, resolve: {taskApplications: TaskApplicationsResolver} },
      { path: 'punctualTasks', component: PunctualTasksComponent, resolve: {punctualTasksList: PunctualTasksResolver} },
      { path: 'taskAgenda', component: TaskAgendaComponent, resolve: {periodicTasksList: TaskAgendaResolver} },
      { path: 'messages/:participantName', component: MessagesComponent, resolve: {user: MessagesResolver} },
      { path: 'messages', component: MessagesComponent, resolve: {user: MessagesResolver} },
      { path: 'user/edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    ]
   },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

