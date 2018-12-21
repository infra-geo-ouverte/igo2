import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ActivityService } from '@igo2/core';
import { SpinnerComponent } from '@igo2/common';

@Directive({
  selector: '[fadqSpinnerActivity]',
  providers: [SpinnerComponent]
})
export class SpinnerActivityDirective implements OnInit, OnDestroy {

  private counter$$: Subscription;

  constructor(
    @Self() private spinner: SpinnerComponent,
    private activityService: ActivityService
  ) {
    this.spinner = spinner;
  }

  ngOnInit() {
    this.counter$$ = this.activityService.counter$
      .pipe(
        debounceTime(50)
      ).subscribe((count: number) => {
        count > 0 ? this.spinner.show() : this.spinner.hide();
      });
  }

  ngOnDestroy() {
    this.counter$$.unsubscribe();
  }
}
