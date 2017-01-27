import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'igo-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.styl']
})
export class LanguageComponent {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' }
  ];


  constructor( @Inject(LOCALE_ID) protected localeId) { }
}
