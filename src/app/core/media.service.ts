import { Injectable} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../app.store';

export type Media = 'mobile' | 'tablet' | 'desktop';

@Injectable()
export class MediaService {

  private media: Media;

  constructor(private store: Store<AppStore>) {
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
    if (media !== this.media) {
      this.store.dispatch({type: 'SET_MEDIA', payload: media});
    }
  }

}
