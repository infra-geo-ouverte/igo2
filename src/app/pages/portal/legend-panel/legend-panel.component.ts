import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  IgoMap
} from '@igo2/geo';

@Component({
  selector: 'app-legend-panel',
  templateUrl: './legend-panel.component.html',
  styleUrls: ['./legend-panel.component.scss']
})
export class LegendPanelComponent implements OnInit, OnDestroy {

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value !== !this._opened) {
      return;
    }
    this._opened = value;
  }
  private _opened = true;

  @Input()
  get panelOpenState(): boolean {
    return this._panelOpenState;
  }
  set panelOpenState(value: boolean) {
    this._panelOpenState = value;
  }
  private _panelOpenState: boolean;

  @Input()
  get mobile(): boolean {
    return this._mobile;
  }
  set mobile(value: boolean) {
    this._mobile = value;
  }
  private _mobile: boolean;


  @Output() closeLegend = new EventEmitter<boolean>();

  public sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get sidenavOpened(): boolean {
    return this.sidenavOpened$.value;
  }

  set sidenavOpened(value: boolean) {
    this.sidenavOpened$.next(value);
  }

  constructor() { }

  private closePanelLegend() {
    this.panelOpenState = false;
    this.sidenavOpened = false;
    this.closeLegend.emit();
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.clearButton();
    this.closePanelLegend();
    this.sidenavOpened$.unsubscribe();
  }

  public clearButton() {
    this.map.queryResultsOverlay.clear();
    this.sidenavOpened = false;
    this.panelOpenState = false;
    this.closeLegend.emit();
  }

}
