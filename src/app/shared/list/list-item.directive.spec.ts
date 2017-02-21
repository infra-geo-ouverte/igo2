import { ElementRef } from '@angular/core';
import { ListItemDirective } from './list-item.directive';

export class MockElementRef extends ElementRef {}

describe('ListItemDirective', () => {
  it('should create an instance', () => {
    const directive = new ListItemDirective(
      undefined, new MockElementRef({}));
    expect(directive).toBeTruthy();
  });
});
