import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
    Http,
    BaseRequestOptions
} from '@angular/http';

import { TestModule } from '../../test.module';

import { CapabilitiesService } from './capabilities.service';
import { LayerService } from './layer.service';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('LayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Http, useValue: mockHttpProvider },
        CapabilitiesService,
        LayerService
      ]
    });
  });

  it('should ...', inject([LayerService], (service: LayerService) => {
    expect(service).toBeTruthy();
  }));

  it('create WMS layer ...', inject([LayerService], (service: LayerService) => {

    const layerOptions = {
      'name' : 'WMS2',
      'type' : 'wms',
      'title' : 'test wms',
      'optionsFromCapabilities' : false,
      'source': {
        'url' : 'prodCogWMS/',
        'params' : {'LAYERS': 'ADN_CAMERA',
                    'VERSION': '1.1.1'},
        'serverType' : 'mapserver'
      },
      'opacity' : 0.5,
      'visible' : false,
      'minResolution' : 5000,
      'maxResolution' : 10000
    };

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.opacity).toEqual(layerOptions.opacity);
          expect(p.type).toEqual(layerOptions.type);
          expect(p.visible).toEqual(layerOptions.visible);
          expect(p.maxResolution).toEqual(layerOptions.maxResolution);
          expect(p.minResolution).toEqual(layerOptions.minResolution);
          expect(p.name).toEqual(layerOptions.name);
          expect(p.optionsFromCapabilities).toEqual(layerOptions.optionsFromCapabilities);
          expect(p.title).toEqual(layerOptions.title);
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);
          expect(p.source.getParams()).toEqual(layerOptions.source.params);

          return layer;
        }
      );
  }));



});
