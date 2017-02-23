import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { MediaService } from '../../core/media.service';
import { FlexibleComponent } from '../flexible/flexible.component';
import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', () => {
  let component: CollapsibleComponent;
  let fixture: ComponentFixture<CollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [
        FlexibleComponent,
        CollapsibleComponent
      ],
      providers: [
        MediaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
