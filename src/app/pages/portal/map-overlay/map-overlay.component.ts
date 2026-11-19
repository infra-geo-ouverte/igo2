import { NgClass } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';

import { Context, ContextService } from '@igo2/context';
import { ConfigService } from '@igo2/core/config';
import { MediaService } from '@igo2/core/media';

import { Subscription } from 'rxjs';

import { MapOverlay } from './map-overlay.interface';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss'],
  imports: [NgClass]
})
export class MapOverlayComponent implements AfterViewInit, OnDestroy {
  private contextService = inject(ContextService);
  private mediaService = inject(MediaService);
  private configService = inject(ConfigService);

  public mapOverlay: MapOverlay[] = [];
  private context$$: Subscription;
  private media$$: Subscription;
  private context: Context;

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe((context) => {
      this.handleContextChange(context);
      this.context = context;
    });
    this.media$$ = this.mediaService.media$.subscribe(() =>
      this.handleContextChange(this.context)
    );
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.media$$.unsubscribe();
  }

  private handleContextChange(context: Context | undefined) {
    if (context === undefined) {
      return;
    }

    let mapOverlay: MapOverlay[] = [];
    this.mapOverlay = mapOverlay;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((context as any)['mapOverlay']) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapOverlay = (context as any)['mapOverlay'];
    } else {
      mapOverlay = this.configService.getConfig('mapOverlay', []);
    }
    for (const overlay of mapOverlay) {
      // If no media define use default to desktop, display only if current media is on context definition
      const media = this.mediaService.getMedia();
      if (!media) {
        return;
      }
      if (
        (!overlay.media && media === 'desktop') ||
        (overlay.media && overlay.media.includes(media))
      ) {
        this.mapOverlay.push(overlay);
      }
    }
  }
}
