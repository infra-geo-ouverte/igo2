import { async, TestBed } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { ContextFormComponent } from './context-form.component';

describe('ContextFormComponent', () => {
  // let component: ContextFormComponent;
  // let fixture: ComponentFixture<ContextFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TestModule,
        SharedModule
      ],
      declarations: [ ContextFormComponent ]
    })
    .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(ContextFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.context = {
      title: 'foo',
      uri: 'bar'
    };
    expect(component).toBeTruthy();
  });
  */
});
