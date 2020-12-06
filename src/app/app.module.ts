import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {BsDropdownModule, TabsModule, BsDatepickerModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';

import {TimeAgoPipe} from 'node_modules/time-ago-pipe';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {AuthService} from './_services/auth.service';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from './_services/error.interceptor';
import {AlertifyService} from './_services/alertify.service';
import {ChatService} from './_services/chat.service';
import {ListTasksComponent} from './tasks/list-tasks/list-tasks.component';
import {TaskSomeoneComponent} from './task-someone/task-someone.component';
import {MessagesComponent} from './messages/page/messages.component';
import {appRoutes} from './routes';
import {AuthGuard} from './_guards/auth.guard';
import {TaskSomeoneService} from './_services/task-someone.service';
import {TaskSomeoneCardComponent} from './tasks/task-someone-card/task-someone-card.component';
import {TaskSomeoneDetailComponent} from './tasks/task-someone-detail/task-someone-detail.component';
import {MediaGalleryComponent} from './media/media-gallery/media-gallery.component';
import {environment} from '../environments/environment';
import {TaskSomeoneDetailResolver} from './_resolvers/task-someone-detail.resolver';
import {CreatedTasksResolver} from './_resolvers/created-tasks.resolver';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {PhotoEditorComponent} from './user/photo-editor/photo-editor.component';
import {UserService} from './_services/user.service';
import {UserEditResolver} from './_resolvers/user-edit.resolver';
import {MessagesResolver} from './_resolvers/messages.resolver';
import {PreventUnsavedChanges} from './_guards/prevent-unsaved-changes.guard';
import {MediaUploadComponent} from './media/media-upload/media-upload.component';
import {CreatedTasksComponent} from './tasks/created-tasks/created-tasks.component';
import {EditTaskComponent} from './tasks/edit-task/edit-task.component';
import {GenericPaginatorComponent} from './generics/generic-paginator/generic-paginator.component';
import {MessageListItemComponent} from './messages/message-list-item/message-list-item.component';
import {MessagesContainerComponent} from './messages/messages-container/messages-container.component';
import {ConversationService} from './_services/conversation.service';
import {MessageService} from './_services/message.service';
import {TaskApplicationsComponent} from './tasks/task-applications/task-applications.component';
import {TaskApplicationsResolver} from './_resolvers/task-applications.resolver';
import {TaskApplicationCardComponent} from './tasks/task-application-card/task-application-card.component';
import {FilterParticipantPipe, FilterSubTasksPipe, FilterUsersPipe} from './_pipes/pipes';
import {TaskApplicantsListComponent} from './tasks/task-applicants-list/task-applicants-list.component';
import {SendMessageComponent} from './generics/send-message/send-message.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {MainPageComponent} from './main-page/main-page.component';
import {TaskState} from './_models/TaskState';
import { SubtasksListComponent } from './tasks/subtasks-list/subtasks-list.component';
import { TaskStateComponent } from './tasks/task-state/task-state.component';
import { TaskAgendaComponent } from './tasks/task-agenda/task-agenda.component';
import { PunctualTasksComponent } from './tasks/punctual-tasks/punctual-tasks.component';
import { PunctualTasksResolver } from './_resolvers/punctual-tasks.resolver';
import { TaskAgendaResolver } from './_resolvers/task-agenda.resolver';
import { SubtaskDetailsComponent } from './tasks/subtask-details/subtask-details.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        RegisterComponent,
        ListTasksComponent,
        TaskSomeoneComponent,
        MessagesComponent,
        TaskSomeoneCardComponent,
        TaskSomeoneDetailComponent,
        TimeAgoPipe,
        FilterParticipantPipe,
        FilterUsersPipe,
        FilterSubTasksPipe,
        MediaGalleryComponent,
        UserEditComponent,
        PhotoEditorComponent,
        MediaUploadComponent,
        CreatedTasksComponent,
        EditTaskComponent,
        GenericPaginatorComponent,
        MessageListItemComponent,
        MessagesContainerComponent,
        TaskApplicationsComponent,
        TaskApplicationCardComponent,
        TaskApplicantsListComponent,
        SendMessageComponent,
        UserProfileComponent,
        MainPageComponent,
        SubtasksListComponent,
        TaskStateComponent,
        TaskAgendaComponent,
        PunctualTasksComponent,
        SubtaskDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: environment.whitelistedDomains,
                blacklistedRoutes: environment.blacklistedRoutes
            }
        }),
        NgbModule,
        FileUploadModule
    ],
    providers: [
        AuthService,
        TaskSomeoneService,
        UserService,
        ConversationService,
        MessageService,
        AlertifyService,
        ChatService,
        ErrorInterceptorProvider,
        AuthGuard,
        TaskSomeoneDetailResolver,
        CreatedTasksResolver,
        TaskApplicationsResolver,
        TaskAgendaResolver,
        PunctualTasksResolver,
        UserEditResolver,
        MessagesResolver,
        PreventUnsavedChanges
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        SendMessageComponent
    ]

})
export class AppModule {
}
