import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from '../../_models/Media';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photo: Media;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  urlPreview: any = '';

  // method that will be called when the upload was successfull, and on the
  // parent we will close the modal
  @Output() uploadSuccessful = new EventEmitter<Media>();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
    this.urlPreview = this.photo.url;
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'logged/users/updateProfileImage/' + this.authService.decodedToken.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1 * 1024 * 1024 // (max size of 1 MB)
    });

    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      this.alertify.error('Make sure the file size is less than 1 MB!');
    };

    // fixing the cors problem when uploading image.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      // on that case we will have only one photo on the queue, and when we
      // drop a new one, we will override the first one.
      this.uploader.clearQueue();
      this.uploader.queue.push(file);

      // we fill the preview url so we can display the image before the uploading
      const reader = new FileReader();

      reader.readAsDataURL(file._file); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlPreview = event.target['result'];
      };
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Media = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          type: res.type,
          description: res.description
        };
        this.photo = photo;
        this.authService.currentUser.profilePhoto = photo;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        this.authService.changeUserPhoto(photo.url);
        this.uploadSuccessful.emit(res);
      }


    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      const res: any = JSON.parse(response);
      if (res.status === 'BAD_REQUEST') {
        if (res.message.includes('FileUploadBase$FileSizeLimitExceededException')) {
          this.alertify.error('Maximum upload size exceeded. The file exceeds its maximum permitted size of 1 megabyte.');
        } else {
          this.alertify.error(res.message);
        }
        this.uploader.clearQueue();
        this.urlPreview = '';
      }
    };
  }
}
