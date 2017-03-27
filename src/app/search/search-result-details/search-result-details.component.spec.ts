import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';

import {
  SearchResultType,
  SearchResultFormat
} from '../shared/search-result.enum';
import { SearchResultDetailsComponent } from './search-result-details.component';

describe('SearchResultDetailsComponent', () => {
  let component: SearchResultDetailsComponent;
  let fixture: ComponentFixture<SearchResultDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ SearchResultDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDetailsComponent);
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
