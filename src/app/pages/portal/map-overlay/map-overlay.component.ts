import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Context, ContextService } from '@igo2/context';
import { MapOverlay } from './map-overlay.interface';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss']
})

export class MapOverlayComponent implements AfterViewInit {
  public mapOverlay: MapOverlay;
  public context$$: Subscription;

  constructor(
    private contextService: ContextService
  ) { }

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe(context =>
      this.handleContextChange(context)
    );
  }

  ngOnDestroy(){
    this.contextService.context$.unsubscribe();
  }

  private handleContextChange(context: Context) {
    if (context !== undefined) {
      this.mapOverlay = null;

      if (context["mapOverlay"]) {
        this.mapOverlay = context["mapOverlay"];
      }
    }
  }
}
