import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ActivityService } from '@igo2/core';
import { SpinnerComponent } from '@igo2/common';

/**
 * A directive to bind a SpinnerComponent to the activity service.
 * The activity service tracks any HTTP request and this directive
 * will display the spinner it's attached to when the activity counter
 * is greater than 0.
 */
@Directive({
  selector: '[fadqSpinnerActivity]',
  providers: [SpinnerComponent]
})
export class SpinnerActivityDirective implements OnInit, OnDestroy {

  /**
   * Subscription to the activity service counter
   */
  private counter$$: Subscription;

  constructor(
    @Self() private spinner: SpinnerComponent,
    private activityService: ActivityService
  ) {
    this.spinner = spinner;
  }

  /**
   * Subscribe to the activity service counter and display the spinner
   * when it's is greater than 0.
   * @internal
   */
  ngOnInit() {
    this.counter$$ = this.activityService.counter$
      .pipe(
        debounceTime(50)
      ).subscribe((count: number) => {
        count > 0 ? this.spinner.show() : this.spinner.hide();
      });
  }

  /**
   * Unsubcribe to the activity service counter.
   * @internal
   */
  ngOnDestroy() {
    this.counter$$.unsubscribe();
  }
}
