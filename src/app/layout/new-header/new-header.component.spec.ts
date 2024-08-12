import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeaderComponent } from './new-header.component';

describe('NewHeaderComponent', () => {
  let component: NewHeaderComponent;
  let fixture: ComponentFixture<NewHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHeaderComponent]
    });
    fixture = TestBed.createComponent(NewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
