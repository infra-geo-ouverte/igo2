import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HomeButtonComponent } from '@igo2/common/home-button';
import { PanelComponent } from '@igo2/common/panel';
import { ResizableBarComponent } from '@igo2/common/resizable-bar';
import { Tool, Toolbox, ToolboxComponent } from '@igo2/common/tool';
import { ConfigService } from '@igo2/core/config';
import { IgoMap, isLayerItem } from '@igo2/geo';
import { CatalogState, ToolState } from '@igo2/integration';

import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { importAllTools } from './sidenav-import';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    HomeButtonComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    NgClass,
    NgIf,
    PanelComponent,
    ToolboxComponent,
    TranslateModule,
    ResizableBarComponent
  ]
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
  @Output() widthChange = new EventEmitter<number>();

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  constructor(
    private toolState: ToolState,
    private configService: ConfigService,
    private catalogState: CatalogState
  ) {
    importAllTools();
  }

  ngOnInit() {
    this.activeTool$$ = this.toolbox.activeTool$.subscribe((tool: Tool) => {
      const sidenavTitle = this.configService.getConfig('sidenavTitle', 'IGO');
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
          for (const layer of this.map.layerController.layersFlattened) {
            if (
              isLayerItem(layer) &&
              this.map.layerController.isSelected(layer)
            ) {
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

  handleChange(event: MouseEvent): void {
    this.widthChange.emit(event.clientX);
  }

  onPreviousButtonClick() {
    this.toolbox.activatePreviousTool();
  }

  onUnselectButtonClick() {
    this.toolbox.deactivateTool();
  }
}
