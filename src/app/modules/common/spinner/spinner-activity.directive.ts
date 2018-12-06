import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ActivityService } from '@igo2/core';
import { SpinnerComponent } from '@igo2/common';

@Directive({
  selector: '[fadqSpinnerActivity]'
})
export class SpinnerActivityDirective implements OnInit, OnDestroy {
  private component: SpinnerComponent;
  private counter$$: Subscription;

  constructor(
    @Self() component: SpinnerComponent,
    private activityService: ActivityService
  ) {
    this.component = component;
  }

  ngOnInit() {
    this.counter$$ = this.activityService.counter$
      .pipe(
        debounceTime(50)
      ).subscribe(count => (this.component.shown = count > 0));
  }

  ngOnDestroy() {
    this.counter$$.unsubscribe();
  }
}
