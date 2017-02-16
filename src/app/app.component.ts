import { Component } from '@angular/core';
import { LanguageService } from './core/language/language.service';

import { MediaService } from './core/media.service';

@Component({
  selector: 'igo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  constructor(private languageService: LanguageService) { }
}
