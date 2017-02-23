import { ElementRef } from '@angular/core';

import { ClickoutDirective } from './clickout.directive';

export class MockElementRef extends ElementRef {}

describe('ClickoutDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickoutDirective(new MockElementRef({}));
    expect(directive).toBeTruthy();
  });
});
