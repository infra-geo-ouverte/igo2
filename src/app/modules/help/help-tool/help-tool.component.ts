import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ToolComponent } from '@igo2/common';
import { ConfigService } from '@igo2/core';

/**
 * Help tool
 */
@ToolComponent({
  name: 'help',
  title: 'tools.help',
  icon: 'info'
})
@Component({
  selector: 'fadq-help-tool',
  templateUrl: './help-tool.component.html',
  styleUrls: ['./help-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpToolComponent {

  get logoLink(): string {
    return this.configService.getConfig('help.logoLink');
  }

  get guideLink(): string {
    return this.configService.getConfig('help.guideLink');
  }

  get newsLink(): string {
    return this.configService.getConfig('help.newsLink');
  }

  constructor(private configService: ConfigService) {}
}
