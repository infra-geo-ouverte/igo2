import { async, TestBed } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { LayerFormComponent } from './layer-form.component';

describe('LayerFormComponent', () => {
  // let component: LayerFormComponent;
  // let fixture: ComponentFixture<LayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule,
        ReactiveFormsModule
      ],
      declarations: [ LayerFormComponent ]
    })
    .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(LayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
