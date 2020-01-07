import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { TaskSomeone } from '../_models/TaskSomeone';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskSomeoneService } from '../_services/task-someone.service';
import { Router } from '@angular/router';
import { MediaUploadComponent } from '../media/media-upload/media-upload.component';

@Component({
  selector: 'app-task-someone',
  templateUrl: './task-someone.component.html',
  styleUrls: ['./task-someone.component.css']
})
export class TaskSomeoneComponent implements OnInit {

  baseUrl = environment.apiUrl;
  authToken = 'Bearer ' + localStorage.getItem('token');
  uploaderAvailable = false;
  taskSomeone: TaskSomeone;
  taskSomeoneForm: FormGroup;

  constructor(private alertify: AlertifyService, private fb: FormBuilder, private taskSomeoneServive: TaskSomeoneService,
    private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.taskSomeoneForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  addTaskSomeone() {
    if (this.taskSomeoneForm.valid) {
      this.taskSomeoneServive.createTaskSomeone(this.taskSomeoneForm.value).subscribe((data: TaskSomeone) => {
        this.taskSomeone = data;
        this.uploaderAvailable = true;
      }, error => {
        this.alertify.error(error.subErrors[0].message);
      }
      );
    }
  }

  onMediaUploadSuccessfully() {
    this.alertify.success('Task someone created successfully!');
    this.router.navigate(['/taskDetails', this.taskSomeone.id]);
  }

}
