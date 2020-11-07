import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {environment} from 'src/environments/environment';
import {TaskSomeone} from '../_models/TaskSomeone';
import {AlertifyService} from '../_services/alertify.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {TaskSomeoneService} from '../_services/task-someone.service';
import {Router} from '@angular/router';
import {MediaUploadComponent} from '../media/media-upload/media-upload.component';

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
                private router: Router) {
    }

    ngOnInit() {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.taskSomeoneForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            location: ['', Validators.required],
            repeat: [false],
            frequency: [null],
            startDate: [new Date()],
            endDate: [],
        }, {validator: this.checkRepeatRequiredFieldMatchValidator});
    }

    checkRepeatRequiredFieldMatchValidator(g: FormGroup) {
        let errorReturn = {

        };
        if (g.get('repeat').value) {
            if (g.get('frequency').touched && g.get('frequency').value == null || g.get('frequency').value === '') {
                errorReturn['frequencyMiss'] = true;
            }
            if (g.get('startDate').touched && g.get('startDate').value == null) {
                errorReturn['startDateMiss'] = true;
            }
        }

        if (g.get('endDate').touched && g.get('endDate').value == null) {
            errorReturn['endDateMiss'] = true;
        }
        return errorReturn;
    }

    addTaskSomeone() {
        Object.keys(this.taskSomeoneForm.controls).forEach(field => { // {1}
            const control = this.taskSomeoneForm.get(field);            // {2}
            control.markAsTouched({ onlySelf: true });       // {3}
        });
        this.taskSomeoneForm.updateValueAndValidity();
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

    onTaskSomeoneCreatedSuccessfully() {
        this.alertify.success('Task someone created successfully!');
        this.router.navigate(['/taskDetails', this.taskSomeone.id]);
    }

}
