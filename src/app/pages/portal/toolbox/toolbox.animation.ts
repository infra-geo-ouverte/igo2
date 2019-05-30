import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

export function toolSlideInOut(
  speed = '300ms',
  type = 'ease-in-out'
): AnimationTriggerMetadata {
  return trigger('toolSlideInOut', [
    state(
      'enter',
      style({
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    transition('void => enter', animate(speed + ' ' + type))
  ]);
}
