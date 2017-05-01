import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgoModule } from 'igo2';
import { SharedModule } from '../../../shared';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IgoModule.forRoot(),
        SharedModule
      ],
      declarations: [
        ToastComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
