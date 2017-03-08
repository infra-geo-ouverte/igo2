import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';

import { OSMLayer } from '../shared/layers/layer-osm';
import { LayerEditorComponent } from './layer-editor.component';
import { LayerService } from '../shared/layer.service';

describe('LayerEditorComponent', () => {
  let component: LayerEditorComponent;
  let fixture: ComponentFixture<LayerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [ LayerEditorComponent ],
      providers: [
        LayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.layer = new OSMLayer({name: 'foo', type: 'osm'});
    expect(component).toBeTruthy();
  });
});
