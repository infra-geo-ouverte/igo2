import { Component } from '@angular/core';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IgoLanguageModule]
})
export class FooterComponent {}
