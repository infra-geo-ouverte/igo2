import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import {
  ActionStore,
  ActionbarMode,
  EntityStore,
  getEntityTitle
} from '@igo2/common';
import {
  ConfigService,
  MediaService, //LanguageService,
  StorageService
} from '@igo2/core';
import {
  Feature,
  FeatureMotion,
  IgoMap,
  SearchResult,
  computeOlFeaturesExtent,
  featureToOl,
  featuresAreOutOfView,
  getCommonVectorSelectedStyle,
  getCommonVectorStyle
} from '@igo2/geo';
import { QueryState, StorageState } from '@igo2/integration';

import olFormatGeoJSON from 'ol/format/GeoJSON';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SearchState } from '../search.state';

@Component({
  selector: 'app-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureInfoComponent implements OnInit, OnDestroy {
  get storageService(): StorageService {
    return this.storageState.storageService;
  }

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  @Input()
  get store(): EntityStore<SearchResult<Feature>> {
    return this._store;
  }
  set store(value: EntityStore<SearchResult<Feature>>) {
    this._store = value;
  }
  private _store: EntityStore<SearchResult<Feature>>;

  @Output() closeQuery = new EventEmitter<boolean>();

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
  get mapQueryClick(): boolean {
    return this._mapQueryClick;
  }
  set mapQueryClick(value: boolean) {
    this._mapQueryClick = value;
  }
  private _mapQueryClick: boolean;

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

  @Input()
  get mobile(): boolean {
    return this._mobile;
  }
  set mobile(value: boolean) {
    this._mobile = value;
  }
  private _mobile: boolean;

  @Input()
  get scenarioDateToggle(): string {
    return this._scenarioDateToggle;
  }
  set scenarioDateToggle(value: string) {
    this._scenarioDateToggle = value;
  }
  private _scenarioDateToggle: string;

  public refreshedDetails = true;

  public actionStore = new ActionStore([]);
  public actionbarMode = ActionbarMode.Overlay;
  private isResultSelected$ = new BehaviorSubject(false);
  public isSelectedResultOutOfView$ = new BehaviorSubject(false);
  private isSelectedResultOutOfView$$: Subscription;

  private initialized = true;

  private format = new olFormatGeoJSON();

  private resultOrResolution$$: Subscription;

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  @HostBinding('style.visibility')
  get displayStyle() {
    if (this.results.length) {
      if (this.results.length === 1 && this.initialized) {
        this.selectResult(this.results[0]);
      }
      return 'visible';
    }
    return 'hidden';
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(
    event: KeyboardEvent
  ) {
    this.clearButton();
  }

  get results(): SearchResult<Feature>[] {
    return this.store.all();
  }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  @Input()
  get mapQueryInit(): boolean {
    return this._mapQueryInit;
  }
  set mapQueryInit(mapQueryInit: boolean) {
    this._mapQueryInit = mapQueryInit;
  }
  private _mapQueryInit = false;

  constructor(
    public mediaService: MediaService,
    //public languageService: LanguageService,
    private storageState: StorageState,
    private queryState: QueryState,
    private configService: ConfigService,
    private searchState: SearchState,
    private cdRef: ChangeDetectorRef
  ) {}

  private monitorResultOutOfView() {
    this.isSelectedResultOutOfView$$ = combineLatest([
      this.map.viewController.state$,
      this.resultSelected$
    ])
      .pipe(debounceTime(100))
      .subscribe((bunch) => {
        const selectedResult = bunch[1];
        if (!selectedResult) {
          this.isSelectedResultOutOfView$.next(false);
          return;
        }
        const selectedOlFeature = featureToOl(
          selectedResult.data,
          this.map.projection
        );
        const selectedOlFeatureExtent = computeOlFeaturesExtent(
          [selectedOlFeature],
          this.map.viewProjection
        );
        this.isSelectedResultOutOfView$.next(
          featuresAreOutOfView(this.map.getExtent(), selectedOlFeatureExtent)
        );
      });
  }

  ngOnInit() {
    //this.onClearSearch();
    this.refreshedDetails = true;
    this.store.entities$.subscribe(() => {
      this.initialized = true;
    });
    this.monitorResultOutOfView();
  }

  ngOnDestroy(): void {
    this.clearButton();
    if (this.resultOrResolution$$) {
      this.resultOrResolution$$.unsubscribe();
    }
    if (this.isSelectedResultOutOfView$$) {
      this.isSelectedResultOutOfView$$.unsubscribe();
    }
    this.sidenavOpened$.unsubscribe();
  }

  // to clear the search if a mapQuery is initiated
  public onClearSearch() {
    this.map.searchResultsOverlay.clear();
    this.searchStore.clear();
    this.searchState.setSelectedResult(undefined);
    this.searchState.deactivateCustomFilterTermStrategy();
  }

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  selectResult(result: SearchResult<Feature>) {
    this.store.state.update(
      result,
      {
        focused: true,
        selected: true
      },
      true
    );
    this.resultSelected$.next(result);

    const features = [];
    for (const feature of this.store.all()) {
      if (feature.meta.id === result.meta.id) {
        feature.data.meta.style = getCommonVectorSelectedStyle(
          Object.assign(
            {},
            { feature: feature.data },
            this.queryState.queryOverlayStyleSelection
          )
        );
        feature.data.meta.style.setZIndex(2000);
      } else {
        feature.data.meta.style = getCommonVectorStyle(
          Object.assign(
            {},
            { feature: feature.data },
            this.queryState.queryOverlayStyle
          )
        );
      }
      features.push(feature.data);
    }
    this.map.queryResultsOverlay.removeFeatures(features);
    this.map.queryResultsOverlay.addFeatures(features, FeatureMotion.None);

    this.isResultSelected$.next(true);
    this.initialized = false;
  }

  public unselectResult() {
    this.resultSelected$.next(undefined);
    this.isResultSelected$.next(false);
    this.store.state.clear();

    const features = [];
    for (const feature of this.store.all()) {
      feature.data.meta.style = getCommonVectorStyle(
        Object.assign(
          {},
          { feature: feature.data },
          this.queryState.queryOverlayStyle
        )
      );
      features.push(feature.data);
    }
    this.map.queryResultsOverlay.setFeatures(
      features,
      FeatureMotion.None,
      'map'
    );
  }

  public clearButton() {
    this.map.queryResultsOverlay.clear();
    this.store.clear();
    this.unselectResult();
    this.sidenavOpened = false;
    this.mapQueryClick = false;
    this.panelOpenState = false;
    this.closeQuery.emit();

    setTimeout(() => {
      const backdrop = document.querySelector('igo-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }, 300);
  }

  hideOnToggleChange() {
    this.refreshedDetails = false;
  }

  showOnToggleChange() {
    //this.refreshedDetails = true;
  }
}
