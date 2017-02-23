/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { ZoomComponent } from './zoom.component';

describe('ZoomComponent', () => {
  let component: ZoomComponent;
  let fixture: ComponentFixture<ZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [ ZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
