import {trigger, state, style, transition, animate } from '@angular/core';

const transitionSpeed = '300ms';
const transitionType = 'ease-in-out';

export const toolbarSlideInOut = trigger('toolbarSlideInOut', [
  state('in', style({
    transform: 'translate3d(0, 0, 0)',
    display: 'block'
  })),
  state('out',   style({
    transform: 'translate3d(-100%, 0, 0)',
    display: 'none'
  })),
  transition('in => out', animate('0ms ease-in-out')),
  transition('out => in', animate(`${transitionSpeed} ${transitionType}`))
]);

export const toolSlideInOut = trigger('toolSlideInOut', [
  state('out',   style({
    transform: 'translate3d(100%, 0, 0)',
    display: 'none'
  })),
  state('in', style({
    transform: 'translate3d(0, 0, 0)',
    display: 'block'
  })),
  transition('in => out', animate(`${transitionSpeed} ${transitionType}`)),
  transition('out => in', animate(`${transitionSpeed} ${transitionType}`))
]);
