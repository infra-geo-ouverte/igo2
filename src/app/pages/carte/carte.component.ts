import { Component } from '@angular/core';

import { ConfigService } from '@igo2/core';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {
  public hasHeader: boolean;
  public hasNavigationHeader: boolean;
  public hasFooter: boolean;

  constructor(private configService: ConfigService) {
    this.hasHeader = this.configService.getConfig('header.hasHeader', false);
    this.hasNavigationHeader = this.configService.getConfig(
      'header.hasNavigationHeader',
      false
    );
    this.hasFooter = this.configService.getConfig('hasFooter', false);
  }
}
