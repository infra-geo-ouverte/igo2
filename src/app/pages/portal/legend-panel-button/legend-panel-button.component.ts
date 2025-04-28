import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-legend-panel-button',
  templateUrl: './legend-panel-button.component.html',
  styleUrls: ['./legend-panel-button.component.scss']
})
export class LegendPanelButtonComponent {
  @Output() toggleLegend = new EventEmitter<boolean>();

  @Input()
  get legendPanelOpened(): boolean {
    return this._legendPanelOpened;
  }
  set legendPanelOpened(value: boolean) {
    this._legendPanelOpened = value;
  }
  private _legendPanelOpened: boolean;

  constructor(private sharedDataService: SharedDataService) {}

  toggleLegendPanel(): void {
    this.legendPanelOpened = !this.legendPanelOpened;
    this.toggleLegend.emit(this.legendPanelOpened);

    this.sharedDataService.setSidenavResults(true);
  }
}
