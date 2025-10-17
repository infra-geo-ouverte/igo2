import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  model,
  output
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
    PanelComponent,
    ToolboxComponent,
    TranslateModule,
    ResizableBarComponent
  ]
})
export class SidenavComponent implements OnInit, OnDestroy {
  private toolState = inject(ToolState);
  private configService = inject(ConfigService);
  private catalogState = inject(CatalogState);

  title$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private activeTool$$: Subscription;

  readonly map = input<IgoMap>();
  readonly opened = model<boolean>();

  readonly openedChange = output<boolean>();
  readonly toolChange = output<Tool>();
  readonly widthChange = output<number>();

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  constructor() {
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
          const layerController = this.map().layerController;
          for (const layer of layerController.layersFlattened) {
            if (isLayerItem(layer) && layerController.isSelected(layer)) {
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
