import { Component } from '@angular/core';

import { LanguageService } from 'igo2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  constructor (protected languageService: LanguageService) {}
}
