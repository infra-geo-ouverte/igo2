import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmeublesComponent } from './immeubles.component';

describe('ImmeublesComponent', () => {
  let component: ImmeublesComponent;
  let fixture: ComponentFixture<ImmeublesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImmeublesComponent]
    });
    fixture = TestBed.createComponent(ImmeublesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
