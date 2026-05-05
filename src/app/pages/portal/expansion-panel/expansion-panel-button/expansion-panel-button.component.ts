import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'app-expansion-panel-button',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule
  ],
  templateUrl: './expansion-panel-button.component.html',
  styleUrls: ['./expansion-panel-button.component.scss']
})
export class ExpansionPanelButtonComponent {
  readonly expanded = model<boolean>(undefined);

  onToggleClick(): void {
    this.expanded.update((expanded) => !expanded);
  }
}
