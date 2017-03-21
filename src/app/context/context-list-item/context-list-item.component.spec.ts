import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { ContextListItemComponent } from './context-list-item.component';

describe('ContextItemComponent', () => {
  let component: ContextListItemComponent;
  let fixture: ComponentFixture<ContextListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [ ContextListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.context = {
      uri: 'foo',
      title: 'bar'
    };
    expect(component).toBeTruthy();
  });
});
