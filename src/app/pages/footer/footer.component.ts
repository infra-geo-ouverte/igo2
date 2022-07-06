import { Component } from '@angular/core';
import { LanguageService } from '@igo2/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    protected languageService: LanguageService) {
    }

}
