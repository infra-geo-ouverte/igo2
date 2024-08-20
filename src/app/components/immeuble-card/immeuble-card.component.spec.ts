import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmeubleCardComponent } from './immeuble-card.component';

describe('ImmeubleCardComponent', () => {
  let component: ImmeubleCardComponent;
  let fixture: ComponentFixture<ImmeubleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImmeubleCardComponent]
    });
    fixture = TestBed.createComponent(ImmeubleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
