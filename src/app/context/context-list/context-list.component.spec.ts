import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { ToolService } from '../../tool/shared/tool.service';

import { ContextListComponent } from './context-list.component';
import { ContextListItemComponent } from '../context-list-item/context-list-item.component';
import { ContextService } from '../shared/context.service';


describe('ContextListComponent', () => {
  let component: ContextListComponent;
  let fixture: ComponentFixture<ContextListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [
        ContextListComponent,
        ContextListItemComponent
      ],
      providers: [
        ContextService,
        ToolService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
