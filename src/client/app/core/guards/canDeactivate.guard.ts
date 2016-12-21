import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

export interface ICanComponentDeactivate {
 canDeactivate: () => boolean | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {
  canDeactivate(component: ICanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
