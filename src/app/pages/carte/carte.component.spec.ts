import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteComponent } from './carte.component';

describe('CarteComponent', () => {
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteComponent]
    });
    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
