import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { selectedTool } from '../../reducers';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemComponent } from '../toolbar-item/toolbar-item.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        ToolbarComponent,
        ToolbarItemComponent
      ],
      providers: [
        provideStore({ selectedTool })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
