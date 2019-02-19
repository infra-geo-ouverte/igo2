import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Context, ContextService } from '@igo2/context';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './mapOverlay.component.html',
  styleUrls: ['./mapOverlay.component.scss']
})

export class MapOverlayComponent implements AfterViewInit {

  /**
    @param mapOverlay [any[]]:
        cssClass [string]: Css class to define position of the element
          - options:  top-left, center-left, bottom-left, top-center, center-center,
                      bottom-center, top-right, center-right, bottom-right
        fixed [boolean]:  Is element is fixed, won't be affect by animation, default to false
        link [string]:    Link to open when element is clicked
        imgSrc [string]:  source of the image to show
        imgSize [string]: size of the image
        text [string]:    text to show before image
        alt [string]:     alternate text for an image if the image cannot be displayed
  */
  public mapOverlay: any[];
  public context$$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private component: ElementRef,
    public contextService: ContextService
  ) { }

  ngAfterViewInit() {
    this.context$$ = this.contextService.context$.subscribe(context =>
      this.handleContextChange(context)
    );
  }

  private handleContextChange(context: Context) {
    if (context !== undefined) {
      this.mapOverlay = null;

      if (context['mapOverlay']) {
        this.mapOverlay = context['mapOverlay'];
      }
    }
  }
}
