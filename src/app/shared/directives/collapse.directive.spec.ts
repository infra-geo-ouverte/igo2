import { async, inject, TestBed } from '@angular/core/testing';
import { ElementRef, Renderer } from '@angular/core';

import { CollapseDirective } from './collapse.directive';

export class MockElementRef extends ElementRef {}

describe('CollapseDirective', () => {
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        Renderer
      ]
    })
    .compileComponents();
  }));

  it('should create an instance',
    inject([Renderer], (renderer: Renderer) => {
      const directive = new CollapseDirective(renderer, new MockElementRef({}));
      expect(directive).toBeTruthy();
  }));
});
