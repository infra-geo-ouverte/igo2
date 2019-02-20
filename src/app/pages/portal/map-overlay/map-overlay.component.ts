import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Context, ContextService } from '@igo2/context';
import { MediaService } from '@igo2/core';
import { MapOverlay } from './map-overlay.interface';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss']
})

export class MapOverlayComponent implements AfterViewInit, OnDestroy {
  public mapOverlay: MapOverlay[] = [];
  private context$$: Subscription;

  constructor(
    private contextService: ContextService,
    private mediaService: MediaService
  ) { }

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe(context =>
      this.handleContextChange(context)
    );
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
  }

  private handleContextChange(context: Context) {
    if (context !== undefined) {
      this.mapOverlay = [];

      if (context['mapOverlay']) {
        for (const overlay of context['mapOverlay']) {

          // If no media define use default to desktop, display only if current media is on context definition
          if ((!overlay.media && this.mediaService.getMedia() === 'desktop') ||
          (overlay.media && overlay.media.includes(this.mediaService.getMedia()))) {
            this.mapOverlay.push(overlay);
          }
        }
      }
    }
  }
}
