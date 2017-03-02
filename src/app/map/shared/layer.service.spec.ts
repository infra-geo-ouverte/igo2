import { TestBed, inject } from '@angular/core/testing';

import { LayerService } from './layer.service';

import { MockBackend } from '@angular/http/testing';
import {
    Http,
    BaseRequestOptions
} from '@angular/http';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('LayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Http, useValue: mockHttpProvider }, LayerService]
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
    
    const layer = service.createLayer(layerOptions).subscribe(
        layer => {

          expect(layer).toBeTruthy();
          expect(layer.olLayer.getProperties().opacity).toEqual(layerOptions.opacity);
          expect(layer.olLayer.getProperties().type).toEqual(layerOptions.type);
          expect(layer.olLayer.getProperties().visible).toEqual(layerOptions.visible);
          expect(layer.olLayer.getProperties().maxResolution).toEqual(layerOptions.maxResolution);
          expect(layer.olLayer.getProperties().minResolution).toEqual(layerOptions.minResolution);
          expect(layer.olLayer.getProperties().name).toEqual(layerOptions.name);
          expect(layer.olLayer.getProperties().optionsFromCapabilities).toEqual(layerOptions.optionsFromCapabilities);
          expect(layer.olLayer.getProperties().title).toEqual(layerOptions.title);
          expect(layer.olLayer.getProperties().source.getUrl()).toEqual(layerOptions.source.url);
          expect(layer.olLayer.getProperties().source.getParams()).toEqual(layerOptions.source.params);

          return layer;
        }
      );
  }));



});
