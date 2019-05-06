import { Component,Input, ChangeDetectionStrategy } from '@angular/core';

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

  @Input() guide: string;

  @Input() news: string;

  get logoLink(): string {
    return this.configService.getConfig('help.logoLink');
  }

  get guideLink(): string {
    return this.guide || this.configService.getConfig('help.guideLink');
  }

  get newsLink(): string {
    return this.news || this.configService.getConfig('help.newsLink');
  }

  constructor(private configService: ConfigService) {}
}
