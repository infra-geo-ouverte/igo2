import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaService } from '../../core/media.service';
import { FlexibleComponent } from './flexible.component';

describe('FlexibleComponent', () => {
  let component: FlexibleComponent;
  let fixture: ComponentFixture<FlexibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexibleComponent ],
      providers: [
        MediaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexibleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
