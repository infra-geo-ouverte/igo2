import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';
import { ContextItemComponent } from './context-item.component';

describe('ContextItemComponent', () => {
  let component: ContextItemComponent;
  let fixture: ComponentFixture<ContextItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [ ContextItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.context = {
      name: 'foo',
      title: 'bar'
    };
    expect(component).toBeTruthy();
  });
});
