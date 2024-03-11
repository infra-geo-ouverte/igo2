import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'app-expansion-panel-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule,
    NgIf
  ],
  templateUrl: './expansion-panel-button.component.html',
  styleUrls: ['./expansion-panel-button.component.scss']
})
export class ExpansionPanelButtonComponent {
  @Input() expanded: boolean;

  @Output() expand = new EventEmitter<boolean>();

  onToggleClick(): void {
    this.expand.emit(!this.expanded);
  }
}
