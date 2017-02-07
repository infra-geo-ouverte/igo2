/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
   provideAppStore,
   provideSearchAdapter,
   provideSearchAdapterService
} from '../../core/core.module';

import { SearchService } from '../../core/search.service';

import { SharedModule } from '../../shared/shared.module';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ SearchBarComponent ],
      providers: [
        provideAppStore(),
        provideSearchAdapterService(),
        provideSearchAdapter(),
        SearchService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
