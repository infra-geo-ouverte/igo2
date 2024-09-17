import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-legend-panel',
  templateUrl: './legend-panel.component.html',
  styleUrls: ['./legend-panel.component.scss']
})
export class LegendPanelComponent implements OnInit, OnDestroy {

  @Output() closeLegend = new EventEmitter<boolean>();

  public sidenavOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get sidenavOpened(): boolean {
    return this.sidenavOpened$.value;
  }

  set sidenavOpened(value: boolean) {
    this.sidenavOpened$.next(value);
  }

  @Input()
  get panelOpenState(): boolean {
    return this._panelOpenState;
  }
  set panelOpenState(value: boolean) {
    this._panelOpenState = value;
  }
  private _panelOpenState: boolean;

  constructor() { }

  public closePanelLegend() {
    this.panelOpenState = false;
    this.sidenavOpened = false;
    this.closeLegend.emit();
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.closePanelLegend();
    this.sidenavOpened$.unsubscribe();
  }

}
