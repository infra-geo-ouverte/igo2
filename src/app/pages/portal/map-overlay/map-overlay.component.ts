import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Context, ContextService } from '@igo2/context';
import { MediaService, ConfigService } from '@igo2/core';
import { MapOverlay } from './map-overlay.interface';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss']
})
export class MapOverlayComponent implements AfterViewInit, OnDestroy {
  public mapOverlay: MapOverlay[] = [];
  private context$$: Subscription;
  private media$$: Subscription;
  private context: Context;

  constructor(
    private contextService: ContextService,
    private mediaService: MediaService,
    private configService: ConfigService
  ) {}

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe((context) => {
      this.handleContextChange(context);
      this.context = context;
    });
    this.media$$ = this.mediaService.media$.subscribe((media) =>
      this.handleContextChange(this.context)
    );
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.media$$.unsubscribe();
  }

  private handleContextChange(context: Context) {
    let mapOverlay = [];
    if (context !== undefined) {
      this.mapOverlay = [];

      if (context['mapOverlay']) {
        mapOverlay = context['mapOverlay'];
      } else if (this.configService.getConfig('mapOverlay')) {
        mapOverlay = this.configService.getConfig('mapOverlay');
      }
      for (const overlay of mapOverlay) {
        // If no media define use default to desktop, display only if current media is on context definition
        if (
          (!overlay.media && this.mediaService.getMedia() === 'desktop') ||
          (overlay.media &&
            overlay.media.includes(this.mediaService.getMedia()))
        ) {
          this.mapOverlay.push(overlay);
        }
      }
    }
  }
}
