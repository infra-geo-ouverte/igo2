<<<<<<< HEAD
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FlexMainDirective } from './flex-main.directive';

=======

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FlexMainDirective } from './flex-main.directive';

export class MockElementRef extends ElementRef {}

>>>>>>> 0f33e071a50bafea111356ae4989c38cef8fce12
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
<<<<<<< HEAD
  });

  it('should have one FlexMainDirective', () => {
    expect(des.length).toBe(1);
  });

=======
  });

  it('should have one FlexMainDirective', () => {
    expect(des.length).toBe(1);
  });

>>>>>>> 0f33e071a50bafea111356ae4989c38cef8fce12
});
