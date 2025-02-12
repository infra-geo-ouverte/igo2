import { Component } from '@angular/core';

import { LanguageService } from '@igo2/core/language';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [TranslateModule]
})
export class FooterComponent {
  constructor(protected languageService: LanguageService) {}
}
