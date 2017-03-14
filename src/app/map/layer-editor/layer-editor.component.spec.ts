import { async, TestBed } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TestModule } from '../../test.module';

// import { OSMLayer } from '../shared/layers/layer-osm';
import { LayerEditorComponent } from './layer-editor.component';
import { LayerFormComponent } from '../layer-form/layer-form.component';
import { LayerService } from '../shared/layer.service';

describe('LayerEditorComponent', () => {
  // let component: LayerEditorComponent;
  // let fixture: ComponentFixture<LayerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        ReactiveFormsModule
      ],
      declarations: [
        LayerEditorComponent,
        LayerFormComponent
      ],
      providers: [
        LayerService
      ]
    })
    .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(LayerEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.layer = new OSMLayer({name: 'foo', type: 'osm'});
    expect(component).toBeTruthy();
  });
  */
});
