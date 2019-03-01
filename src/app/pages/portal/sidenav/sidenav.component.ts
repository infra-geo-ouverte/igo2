import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { Tool, Toolbox } from '@igo2/common';
import { ToolState } from '@igo2/integration';


@Component({
  selector: 'fadq-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy {

  title$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private activeTool$$: Subscription;

  @Input()
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }
    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  get opened(): boolean { return this._opened; }
  private _opened: boolean;

  @Output() openedChange = new EventEmitter<boolean>();

  get toolbox(): Toolbox { return this.toolState.toolbox; }

  constructor(private toolState: ToolState) {}

  ngOnInit() {
    this.activeTool$$ = this.toolbox.activeTool$.subscribe((tool: Tool) => {
      this.title$.next(tool ? tool.title : 'IGO');
    });
  }

  ngOnDestroy() {
    this.activeTool$$.unsubscribe();
  }

  onPreviousButtonClick() {
    this.toolbox.activatePreviousTool();
  }

  onUnselectButtonClick() {
    this.toolbox.deactivateTool();
  }

}
