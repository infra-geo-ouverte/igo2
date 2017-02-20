import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type Media = 'mobile' | 'tablet' | 'desktop';

@Injectable()
export class MediaService {

  private _media: Media;
  media = new BehaviorSubject<Media>(undefined);

  constructor() {
    this.setMedia();

    window.addEventListener('resize', (event) => {
     this.setMedia();
    });
  }

  getMedia(): Media {
    const width = window.innerWidth;

    let media = 'desktop';
    if (width <= 500) {
      media = 'mobile';
    } else if (width <= 800) {
      media = 'tablet';
    }

    return media as Media;
  }

  setMedia() {
    const media = this.getMedia();
    if (media !== this._media) {
      this._media = media;
      this.media.next(media);
    }
  }

}
