import { Component, ViewContainerRef } from '@angular/core';
import { Config } from './core/index';
import './operators';

import {TranslateService} from 'ng2-translate';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'igo-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, translate: TranslateService) {
    let userLang = navigator.language.split('-')[0];
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'fr';
    translate.setDefaultLang('fr');
    translate.use(userLang);

    console.log('Environment config', Config);
  }
}
