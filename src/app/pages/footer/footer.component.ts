import { Component } from '@angular/core';
import { ConfigService, LanguageService } from '@igo2/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private configService: ConfigService,
    protected languageService: LanguageService) {
    }

}
