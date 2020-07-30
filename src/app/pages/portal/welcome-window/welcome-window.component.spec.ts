import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeWindowComponent } from './welcome-window.component';

describe('WelcomeWindowComponent', () => {
  let component: WelcomeWindowComponent;
  let fixture: ComponentFixture<WelcomeWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
