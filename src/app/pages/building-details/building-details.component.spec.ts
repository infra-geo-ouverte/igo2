import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingDetailsComponent } from './building-details.component';

describe('BuildingDetailsComponent', () => {
  let component: BuildingDetailsComponent;
  let fixture: ComponentFixture<BuildingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingDetailsComponent]
    });
    fixture = TestBed.createComponent(BuildingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
