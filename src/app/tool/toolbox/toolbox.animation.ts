import {trigger, state, style, transition, animate } from '@angular/core';

const transitionSpeed = '300ms';
const transitionType = 'ease-in-out';

export const toolSlideInOut = trigger('toolSlideInOut', [
  state('left',   style({
    transform: 'translate3d(-100%, 0, 0)'
  })),
  state('center',   style({
    transform: 'translate3d(0, 0, 0)'
  })),
  state('right', style({
    transform: 'translate3d(100%, 0, 0)'
  })),
  transition('left => center', animate(transitionSpeed + ' ' + transitionType)),
  transition('right => center', animate(transitionSpeed + ' ' + transitionType)),
  transition('center => right', animate('0ms ' + transitionType)),
  transition('center => left', animate('0ms ' + transitionType)),
]);
