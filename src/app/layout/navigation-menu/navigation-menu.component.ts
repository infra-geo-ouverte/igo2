import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  more = false;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  mobileView = false;

  onToggleMore() {
    this.more = !this.more;
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((e) => {
      if (window.innerWidth <= 400) {
        this.renderMobileView();
      } else {
        this.renderDesktopView();
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  renderMobileView() {
    console.log('render mobile view');
    this.mobileView = true;
    this.more = false;
  }

  renderDesktopView() {
    console.log('render desktop view');
    this.mobileView = false;
    this.more = false;
  }
}
