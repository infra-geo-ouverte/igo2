
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FlexMainDirective } from './flex-main.directive';

export class MockElementRef extends ElementRef {}

@Component({
  template: `
  <div igoFlexMain></div>
  `
})
class TestComponent { }


describe('FlexMainDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ FlexMainDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();

    // all elements with an attached FlexMainDirective
    des = fixture.debugElement.queryAll(By.directive(FlexMainDirective));
  });

  it('should have one FlexMainDirective', () => {
    expect(des.length).toBe(1);
  });

});
