import { Component, computed, inject, input } from '@angular/core';

import { LanguageService } from '@igo2/core/language';
import {
  IHeaderConfig,
  IHeaderLabels,
  HeaderComponent as SdgHeaderComponent
} from '@igo2/sdg-common';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [SdgHeaderComponent, TranslateModule],
  template: `
    @let config = this.config();

    <sdg-header
      [title]="'header.title' | translate"
      [logo]="config.logo"
      [languages]="config.languages"
      [currentLanguage]="lang()"
      [labels]="headerLabels()"
      [contactUsRoute]="config.contactUsRoute"
      (languageChange)="onLanguageChange($event)"
    />
  `
})
export class HeaderComponent {
  private languageService = inject(LanguageService);

  readonly config = input.required<IHeaderConfig>();
  readonly lang = input.required<string>();

  readonly headerLabels = computed<IHeaderLabels>(() => {
    this.lang();
    return {
      contactUs: this.languageService.translate.instant('header.contactUs')
    };
  });

  onLanguageChange(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
