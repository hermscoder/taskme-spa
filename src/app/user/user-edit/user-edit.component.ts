import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { UserDTO } from '../../_models/UserDTO';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { NgbPopover, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';
import { Media } from '../../_models/Media';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('pswdPopover') pswdPopover: NgbPopover;

  user: any;
  passChange: any = {};
  photoUrl: string;
  changPswdForm: FormGroup;
  //using Partial because it makes all the properties optionals.
  //because we just wanted to set the container class and nothing more.
  bsConfig:  Partial<BsDatepickerConfig>;

  // method that will be called when the user tries to close the browser while not saved the form.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
    private alertify: AlertifyService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD/MM/YYYY'
    };

    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.user.birthDate = new Date(this.user.birthDate);
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

    this.createChangePswdForm();
  }

  createChangePswdForm(){
    this.changPswdForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPasswordRpt: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('newPassword').value === g.get('newPasswordRpt').value ? null : {'mismatch': true};
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(() => {
      this.alertify.success('Profile updated sucessfully!');
    }, error => {
      this.alertify.error(error.message);
    });
    this.editForm.reset(this.user);
  }

  changePassword() {
    this.passChange = this.changPswdForm.value;
    this.passChange.id = this.user.id;
    this.passChange.username = this.user.username;

    this.userService.updateUserPassword(this.passChange).subscribe(() => {
      this.alertify.success('Password updated sucessfully!');
      this.pswdPopover.close();
      this.changPswdForm.reset();
    }, error => {
      this.alertify.error(error.message);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onChangeProfilePicture(newProfilePicture: Media){
    this.user.profilePhoto = this.authService.currentUser.profilePhoto;
  }
}
