/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { MdIconModule } from '@angular/material/icon';

import { StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';

import { selectedTool } from '../../reducers';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemComponent } from '../toolbar-item/toolbar-item.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        MdIconModule.forRoot()
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
