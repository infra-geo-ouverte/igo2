import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPerPageComponent } from './number-per-page.component';

describe('NumberPerPageComponent', () => {
  let component: NumberPerPageComponent;
  let fixture: ComponentFixture<NumberPerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPerPageComponent]
    });
    fixture = TestBed.createComponent(NumberPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
