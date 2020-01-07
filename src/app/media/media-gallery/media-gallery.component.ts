import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../_models/Media';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.css']
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaList: Media[] = [];

  activeMediaIndex: number;

  // get the activeMedia
  get activeMedia(): Media {
    if (this.mediaList) {
      return this.mediaList[this.activeMediaIndex];
    }
    return;

  }
  // if gallery is on the first media
  get onFirstMedia(): boolean {
      return this.activeMediaIndex === 0;
  }

  // if gallery is on the last media
  get onLastMedia(): boolean {
    if (this.mediaList) {
      return this.activeMediaIndex === (this.mediaList.length - 1);
    }
    return true;
  }

  // load image from index
  private loadMedia(index: number) {
    this.activeMediaIndex = index;
  }

  // call next image
  next() {
    if (this.onLastMedia === false) {
      this.loadMedia(this.activeMediaIndex + 1);
    }
  }

  // call prev image
  prev() {
    if (this.onFirstMedia === false) {
      this.loadMedia(this.activeMediaIndex - 1);
    }
  }

  constructor() { }

  ngOnInit() {
    this.activeMediaIndex = 0;
  }

}
