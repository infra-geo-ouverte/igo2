import { Component } from '@angular/core';
import { MediaService } from './core/media.service';

@Component({
  selector: 'igo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  constructor (protected mediaService: MediaService) {
  }
}
