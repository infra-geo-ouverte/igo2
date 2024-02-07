import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export function showContent(
  duration = '150ms',
  delay = '300ms',
  easing = 'ease-in-out'
): AnimationTriggerMetadata {
  return trigger('showContent', [
    state(
      'true',
      style({
        opacity: 1
      })
    ),
    state(
      'false',
      style({
        opacity: 0
      })
    ),
    transition('false => true', animate(`${duration} ${delay} ${easing}`)),
    transition('true => false', animate('0ms'))
  ]);
}
