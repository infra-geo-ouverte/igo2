import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

export function controlSlideX(): AnimationTriggerMetadata {
  return trigger('controlStateX', [
    state(
      'left',
      style({
        left: '5px'
      })
    ),
    state(
      'right',
      style({
        left: '410px'
      })
    ),
    transition('* => *', animate('250ms'))
  ]);
}

export function controlSlideY(): AnimationTriggerMetadata {
  return trigger('controlStateY', [
    state('close', style({})),
    state(
      'down',
      style({
        bottom: '55px'
      })
    ),
    state(
      'up',
      style({
        bottom: '305px'
      })
    ),
    transition('* => *', animate('300ms'))
  ]);
}

export function mapSlideX(): AnimationTriggerMetadata {
  return trigger('mapStateX', [
    state(
      'left',
      style({
        left: '0'
      })
    ),
    state(
      'right',
      style({
        left: '0'
      })
    ),
    transition('* => *', animate('250ms'))
  ]);
}
export function mapSlideY(): AnimationTriggerMetadata {
  return trigger('mapStateY', [
    state(
      'close',
      style({
        bottom: '0'
      })
    ),
    state(
      'down',
      style({
        bottom: '0'
      })
    ),
    state(
      'up',
      style({
        bottom: '0'
      })
    ),
    transition('* => *', animate('250ms'))
  ]);
}
