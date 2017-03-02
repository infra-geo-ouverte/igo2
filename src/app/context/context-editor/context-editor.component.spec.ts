import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { ToolService } from '../../tool/shared/tool.service';

import { ContextService } from '../shared/context.service';
import { ContextEditorComponent } from './context-editor.component';

describe('ContextEditorComponent', () => {
  let component: ContextEditorComponent;
  let fixture: ComponentFixture<ContextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [ ContextEditorComponent ],
      providers: [
        ContextService,
        ToolService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
