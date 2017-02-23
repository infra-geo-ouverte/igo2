import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { LoggingService } from '../logging.service';
import { RequestService } from '../request.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [ SpinnerComponent ],
      providers: [
        LoggingService,
        RequestService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
