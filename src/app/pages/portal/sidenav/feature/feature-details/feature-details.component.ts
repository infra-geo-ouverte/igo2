import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

import { ConnectionState, LanguageService, NetworkService } from '@igo2/core';
import { ConfigService } from '@igo2/core';
import { Feature, IgoMap, SearchSource } from '@igo2/geo';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailsComponent
  implements OnDestroy, AfterViewInit, OnChanges
{
  private state: ConnectionState;
  private unsubscribe$ = new Subject<void>();

  @Input()
  get source(): SearchSource {
    return this._source;
  }
  set source(value: SearchSource) {
    this._source = value;
    this.cdRef.detectChanges();
  }

  @Input() map: IgoMap;

  @Input()
  get feature(): Feature {
    return this._feature;
  }
  set feature(value: Feature) {
    this._feature = value;
    this.cdRef.detectChanges();
    this.selectFeature.emit();
  }

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
    //this.cdRef.detectChanges();
  }
  private _scenarioDateToggle: string;

  public selectedScenarioBorderColor = '#E58271';

  @Input()
  get mapQueryClick(): boolean {
    return this._mapQueryClick;
  }
  set mapQueryClick(value: boolean) {
    this._mapQueryClick = value;
  }
  private _mapQueryClick: boolean;

  private _feature: Feature;
  private _source: SearchSource;

  //@Output() routeEvent = new EventEmitter<boolean>();
  @Output() selectFeature = new EventEmitter<boolean>();
  @Output() htmlDisplayEvent = new EventEmitter<boolean>();

  @Input()
  matTooltipPosition: TooltipPosition;

  constructor(
    private cdRef: ChangeDetectorRef,
    private networkService: NetworkService,
    private languageService: LanguageService,
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.networkService
      .currentState()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: ConnectionState) => {
        this.state = state;
      });
  }

  ngAfterViewInit() {
    if (this.feature.properties.Troncon) {
      setTimeout(() => {}, 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapQueryClick === true || this.feature.properties.Troncon) {
      this.ngAfterViewInit();
    }
    if (
      (this.feature.properties.Troncon && this.mapQueryClick === true) ||
      (this.feature.properties.Troncon && changes.scenarioDateToggle)
    ) {
    }
  }

  formatAddress() {
    if (!this.feature.properties.adresse_immeuble) return '';

    let partis = this.feature.properties.adresse_immeuble
      .split(',')
      .map((p) => p.trim());

    if (partis.length >= 4) {
      return `${partis[0]}, ${partis[1]}\n${partis[2]}, ${partis[3]}\n ${partis.slice(4).join(' ')}`;
    }

    return this.feature.properties.adresse_immeuble; // Retourne l'adresse originale si elle ne suit pas le format attendu
  }

  ngOnDestroy() {
    this.mapQueryClick = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
