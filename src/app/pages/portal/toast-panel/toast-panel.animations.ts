import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export function showContent(
  duration = '50ms',
  delay = '280ms',
  easing = 'ease-in-out'
): AnimationTriggerMetadata {
  return trigger('showContent', [
    state(
      'true',
      style({
        opacity: 1,
        display: 'block'
      })
    ),
    state(
      'false',
      style({
        opacity: 0,
        display: 'none'
      })
    ),
    transition('false => true', animate(`${duration} ${delay} ${easing}`)),
    transition('true => false', animate('0ms'))
  ]);
}
