import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { TestModule } from '../../test.module';
import { RequestService } from '../request.service';

import { MessageComponent } from './message.component';

describe('NotificationComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SimpleNotificationsModule,
        TestModule
      ],
      declarations: [ MessageComponent ],
      providers: [
        RequestService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
