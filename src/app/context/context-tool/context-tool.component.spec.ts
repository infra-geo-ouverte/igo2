import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';
import { ContextToolComponent } from './context-tool.component';
import { ContextItemComponent } from '../context-item/context-item.component';
import { ContextService } from '../../core/context.service';
import { RequestService } from '../../core/request.service';
import { LoggingService } from '../../core/logging.service';
import { ToolService } from '../../core/tool.service';
import { provideAppStore } from '../../core/core.module';

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
        RequestService,
        LoggingService,
        ToolService,
        provideAppStore()
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
