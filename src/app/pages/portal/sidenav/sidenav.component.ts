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
import olFormatGeoJSON from 'ol/format/GeoJSON';

import { Tool, Toolbox, getEntityTitle, FlexibleState } from '@igo2/common';
import { SearchResult, IgoMap, moveToOlFeatures } from '@igo2/geo';
import { ToolState } from '@igo2/integration';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy {
  title$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  topPanelState: FlexibleState = 'initial';

  private activeTool$$: Subscription;
  private format = new olFormatGeoJSON();

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get searchResult(): SearchResult {
    return this._searchResult;
  }
  set searchResult(value: SearchResult) {
    this._searchResult = value;
    if (!value) {
      this.topPanelState = 'initial';
    } else if (this.topPanelState === 'initial') {
      this.topPanelState = 'collapsed';
    }
  }
  private _searchResult: SearchResult;

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

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  get panelTitle(): string {
    let title;
    if (this.searchResult !== undefined) {
      title = getEntityTitle(this.searchResult);
    }
    return title;
  }

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

  zoomToFeatureExtent() {
    if (this.searchResult.data.geometry) {
      const olFeature = this.format.readFeature(this.searchResult.data, {
        dataProjection: this.searchResult.data.geometry.projection,
        featureProjection: this.map.projection
      });
      moveToOlFeatures(this.map, olFeature);
    }
  }

  toggleTopPanel() {
    if (this.topPanelState === 'collapsed') {
      this.topPanelState = 'expanded';
    } else {
      this.topPanelState = 'collapsed';
    }
  }
}
