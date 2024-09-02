import { Component, Input } from '@angular/core';

import { LanguageService } from '@igo2/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() isDisplayingMap: boolean;
  constructor(protected languageService: LanguageService) {}
}
