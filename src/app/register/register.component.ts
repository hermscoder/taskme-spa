import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  //using Partial because it makes all the properties optionals.
  //because we just wanted to set the container class and nothing more.
  bsConfig:  Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder,
            private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY'
    };
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      username: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4)]],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      birthDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  register() {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.alertify.success('Registration successfull');
      }, error => {
        var errorMsg;
        if(error.subErrors != null){
          errorMsg = error.subErrors[0].message;
        } else {
          errorMsg = error.message
        }
        this.alertify.error(errorMsg);
      }, () => this.authService.login(this.registerForm.value).subscribe(() => {
        this.router.navigate(['/findTasks']);
      })
      );
    }
  }

  // we want to switch the registerToggle that is inside the home component. so we need to use component comunication
  cancel() {
    this.cancelRegister.emit(false);
  }
}
