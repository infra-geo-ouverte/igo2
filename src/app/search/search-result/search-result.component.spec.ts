import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import {
  SearchResultType,
  SearchResultFormat
} from '../shared/search-result.enum';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [ SearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.result = {
      id: '1',
      type: SearchResultType.Feature,
      format: SearchResultFormat.GeoJSON,
      title: 'foo',
      icon: 'bar',
      source: 'foo'
    };
    expect(component).toBeTruthy();
  });
});
