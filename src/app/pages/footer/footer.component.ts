import { Component, inject } from '@angular/core';

import { LanguageService } from '@igo2/core/language';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [TranslateModule]
})
export class FooterComponent {
  protected languageService = inject(LanguageService);
}
