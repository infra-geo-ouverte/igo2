import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { ToolService } from '../../tool/shared/tool.service';

import { ContextToolComponent } from './context-tool.component';
import { ContextItemComponent } from '../context-item/context-item.component';
import { ContextService } from '../shared/context.service';


describe('ContextToolComponent', () => {
  let component: ContextToolComponent;
  let fixture: ComponentFixture<ContextToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [
        ContextToolComponent,
        ContextItemComponent
      ],
      providers: [
        ContextService,
        ToolService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
