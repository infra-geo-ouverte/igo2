import { async, TestBed } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TestModule } from '../../test.module';

import { ToolService } from '../../tool/shared/tool.service';

import { ContextService } from '../shared/context.service';
import { ContextEditorComponent } from './context-editor.component';
import { ContextFormComponent } from '../context-form/context-form.component';

describe('ContextEditorComponent', () => {
  // let component: ContextEditorComponent;
  // let fixture: ComponentFixture<ContextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
      declarations: [
        ContextEditorComponent,
        ContextFormComponent
      ],
      providers: [
        ContextService,
        ToolService
      ]
    })
    .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(ContextEditorComponent);
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
