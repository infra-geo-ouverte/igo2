import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { SharedModule } from '../../shared/shared.module';

import { LayerService } from '../shared/layer.service';
import { LayerListComponent } from './layer-list.component';
import { LayerListItemComponent } from '../layer-list-item/layer-list-item.component';
import { LayerLegendComponent } from '../layer-legend/layer-legend.component';

describe('LayerListComponent', () => {
  let component: LayerListComponent;
  let fixture: ComponentFixture<LayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        SharedModule
      ],
      declarations: [
        LayerListComponent,
        LayerListItemComponent,
        LayerLegendComponent
      ],
      providers: [
        LayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.layers = [];
    expect(component).toBeTruthy();
  });
});
