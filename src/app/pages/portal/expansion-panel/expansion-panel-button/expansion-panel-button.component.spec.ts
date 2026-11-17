import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockTranslation } from '@igo2/core/language';

import { ExpansionPanelButtonComponent } from './expansion-panel-button.component';

describe('ExpansionPanelButtonComponent', () => {
  let component: ExpansionPanelButtonComponent;
  let fixture: ComponentFixture<ExpansionPanelButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpansionPanelButtonComponent],
      providers: [provideMockTranslation()]
    });
    fixture = TestBed.createComponent(ExpansionPanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
