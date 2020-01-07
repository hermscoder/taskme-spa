import { Component, OnInit, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  urlPreviewList: Array<string> = [];

  @Input() url: string;
  @Input() authToken: string;
  @Input() hideUploadAllBtn: boolean;

  @Output() uploadSuccessful: EventEmitter<any> = new EventEmitter();

  constructor(private alertify: AlertifyService) { }

  // TODO Create an input property for the URL, for the token, and for other usefull
  // properties.
  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.url,
      authToken: this.authToken,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      autoUpload: false,
      maxFileSize: 1 * 1024 * 1024 // (max size of 1 MB)
    });

    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      this.alertify.error('Make sure the file size is less than 1 MB!');
    };

    // fixing the cors problem when uploading image.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;

      // we fill the preview url so we can display the image before the uploading
      const reader = new FileReader();

      reader.readAsDataURL(file._file); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlPreviewList.push(event.target['result']);
      };
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      if (response) {
        const res: any = JSON.parse(response);
        if (res.status === 'BAD_REQUEST') {
          if (res.message.includes('api.cloudinary.com')) {
            this.alertify.error('An unnexpected error happened with the file uploading service.');
          }
        } else {
          this.alertify.error(res.message);
        }

      }
    };

    this.uploader.onSuccessItem = (item, response, status) => {
      if (this.uploadSuccessful && this.uploader.queue.findIndex(x => x === item) === this.uploader.queue.length - 1 ) {
        const res: any = JSON.parse(response);
        this.uploadSuccessful.emit(res);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public removeItemFromQueue(itemIndex) {
    this.uploader.removeFromQueue(this.uploader.queue[itemIndex]);
    this.urlPreviewList.splice(itemIndex, 1);
  }

  public uploadAllMedia() {
    this.uploader.uploadAll();
  }
  /**
   * This method is being used just because the right click of the cursor was firing a
   * "Extension context invalidated" error on the console.
   */
  onRightClick() {
    return false;
  }

}
