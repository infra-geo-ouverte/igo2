import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Tool, Toolbox } from '@igo2/common';
import { ConfigService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { CatalogState, ToolState } from '@igo2/integration';

import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy {
  title$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private activeTool$$: Subscription;

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
    if (value === this._opened) {
      return;
    }

    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  private _opened: boolean;

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() toolChange = new EventEmitter<Tool>();

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  constructor(
    private toolState: ToolState,
    private configService: ConfigService,
    private catalogState: CatalogState
  ) {}

  ngOnInit() {
    this.activeTool$$ = this.toolbox.activeTool$.subscribe((tool: Tool) => {
      const sidenavTitle =
        this.configService.getConfig('sidenavTitle') || 'IGO';
      if (tool) {
        if (tool.name === 'catalogBrowser') {
          for (const catalog of this.catalogState.catalogStore.all()) {
            if (
              this.catalogState.catalogStore.state.get(catalog).selected ===
              true
            ) {
              this.title$.next(catalog.title);
            }
          }
        } else if (
          tool.name === 'activeTimeFilter' ||
          tool.name === 'activeOgcFilter'
        ) {
          for (const layer of this.map.layers) {
            if (layer.options.active === true) {
              this.title$.next(layer.title);
            }
          }
        } else {
          this.title$.next(tool.title);
        }
      } else {
        this.title$.next(sidenavTitle);
      }
      this.toolChange.emit(tool);
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
