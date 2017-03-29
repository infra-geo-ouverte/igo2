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


  it('create WFS layer without style ...', inject([LayerService], (service: LayerService) => {

    const layerOptions =  {
      'name' : 'WFS2',
      'type' : 'wfs',
      'source': {
        'url' : 'prodADN/?service=WFS&version=1.1.0&request=GetFeature&' +
                  'typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857'
      },
      'version' : '1.3.0'
    };

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);
          return layer;
        }
      );

  }));


  it('create WFS layer with style ...', inject([LayerService], (service: LayerService) => {

    const layerOptionsDiff =  {
      'name' : 'WFS1',
      'type' : 'wfs',
      'source' : {
        'url' : 'prodADN/?service=WFS&version=1.1.0&request=GetFeature&' +
                  'typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857'
      },
      'style' : {
        'Stroke' : {
            'color' : 'rgba(255, 0, 255, 1.0)',
            'width' : 10
        },
        'Text' : {
          'text' : '${idFeat}',
          'font' :  '48px serif',
          'offsetX' : 50,
          'offsetY' : 25,
          'scale' : 2,
          'rotateWithView' : 90,
          'rotation' : 90,
          'textAlign' : 'left',
          'textBaseline' : 'top',
          'Fill' : {
            'color' : 'rgba(255, 0, 255, 1.0)'
          }
        }
      },
      'version' : '1.3.0'
    };

    const layerOptions = JSON.parse(JSON.stringify(layerOptionsDiff));

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);

          const fctStyle = layer.olLayer.getStyle();
          const feat = new ol.Feature({geometry :
                                          new ol.geom.Polygon(
                                            [[90 , 90] , [90 , 0] , [0 , 0] , [0 , 90] , [90 , 90]]
                                          ),
                                      idFeat : '666Test'});
          const styleFeat = fctStyle(feat)[0];

          expect(styleFeat.getStroke().getColor()).toEqual(layerOptionsDiff.style.Stroke.color);
          expect(styleFeat.getStroke().getWidth()).toEqual(layerOptionsDiff.style.Stroke.width);
          expect(styleFeat.getText().getText()).toEqual(feat.get('idFeat'));
          expect(styleFeat.getText().getFont()).toEqual(layerOptionsDiff.style.Text.font);
          expect(styleFeat.getText().getOffsetX()).toEqual(layerOptionsDiff.style.Text.offsetX);
          expect(styleFeat.getText().getOffsetY()).toEqual(layerOptionsDiff.style.Text.offsetY);
          expect(styleFeat.getText().getScale()).toEqual(layerOptionsDiff.style.Text.scale);
          expect(styleFeat.getText().getRotateWithView())
            .toEqual(layerOptionsDiff.style.Text.rotateWithView);
          expect(styleFeat.getText().getTextAlign())
            .toEqual(layerOptionsDiff.style.Text.textAlign);
          expect(styleFeat.getText().getTextBaseline())
            .toEqual(layerOptionsDiff.style.Text.textBaseline);
          expect(styleFeat.getText().getFill().getColor())
            .toEqual(layerOptionsDiff.style.Text.Fill.color);

          return layer;
        }
      );

  }));

  it('create WFS layer with Circle ...', inject([LayerService], (service: LayerService) => {

    const layerOptionsDiff =  {
      'name' : 'WFS1',
      'type' : 'wfs',
      'source' : {
        'url' : 'prodADN/?service=WFS&version=1.1.0&request=GetFeature&' +
                  'typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857'
      },
      'style' : {
        'Image' : {
          'Circle' : {
            'Fill' : {
              'color' : 'rgba(255, 0, 255, 1.0)'
            },
            'radius' : 666,
            'snapToPixel' : false,
            'Stroke' : {
              'color' : 'rgba(255, 0, 255, 1.0)',
              'width' : 10
            },
            'AtlasManager' : {
              'initialSize' : 666,
              'maxSize' : 333,
              'space' : 3
            }
          }
        },
        'Text' : {
          'text' : '${idFeat}',
          'font' :  '48px serif',
          'offsetX' : 50,
          'offsetY' : 25,
          'scale' : 2,
          'rotateWithView' : 90,
          'rotation' : 90,
          'textAlign' : 'left',
          'textBaseline' : 'top',
          'Fill' : {
            'color' : 'rgba(255, 0, 255, 1.0)'
          }
        }
      },
      'version' : '1.3.0'
    };

    const layerOptions = JSON.parse(JSON.stringify(layerOptionsDiff));

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);

          const fctStyle = layer.olLayer.getStyle();
          const feat = new ol.Feature({geometry : new ol.geom.Point([[90 , 90]]),
                                      idFeat : '666Test'});
          const styleFeat = fctStyle(feat)[0];

          expect(styleFeat.getImage().getRadius())
            .toEqual(layerOptionsDiff.style.Image.Circle.radius);
          expect(styleFeat.getImage().getSnapToPixel())
            .toEqual(layerOptionsDiff.style.Image.Circle.snapToPixel);
          expect(styleFeat.getImage().getStroke().getColor())
            .toEqual(layerOptionsDiff.style.Image.Circle.Stroke.color);
          expect(styleFeat.getImage().getStroke().getWidth())
            .toEqual(layerOptionsDiff.style.Image.Circle.Stroke.width);
          expect(styleFeat.getImage().getFill().getColor())
            .toEqual(layerOptionsDiff.style.Image.Circle.Fill.color);
          expect(styleFeat.getText().getText()).toEqual(feat.get('idFeat'));
          expect(styleFeat.getText().getFont()).toEqual(layerOptionsDiff.style.Text.font);
          expect(styleFeat.getText().getOffsetX()).toEqual(layerOptionsDiff.style.Text.offsetX);
          expect(styleFeat.getText().getOffsetY()).toEqual(layerOptionsDiff.style.Text.offsetY);
          expect(styleFeat.getText().getScale()).toEqual(layerOptionsDiff.style.Text.scale);
          expect(styleFeat.getText().getRotateWithView())
            .toEqual(layerOptionsDiff.style.Text.rotateWithView);
          expect(styleFeat.getText().getTextAlign())
            .toEqual(layerOptionsDiff.style.Text.textAlign);
          expect(styleFeat.getText().getTextBaseline())
            .toEqual(layerOptionsDiff.style.Text.textBaseline);
          expect(styleFeat.getText().getFill().getColor())
            .toEqual(layerOptionsDiff.style.Text.Fill.color);

          return layer;
        }
      );

  }));

  it('create WFS layer with RegularShape ...', inject([LayerService], (service: LayerService) => {

    const layerOptionsDiff =  {
      'name' : 'WFS1',
      'type' : 'wfs',
      'source' : {
        'url' : 'prodADN/?service=WFS&version=1.1.0&request=GetFeature'  +
                    '&typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857'
      },
      'style' : {
        'Image' : {
          'RegularShape' : {
            'Fill' : {
              'color' : 'rgba(255, 0, 255, 1.0)'
            },
            'points' : 10,
            'radius' : 15,
            'radius1' : 3,
            'radius2' : 30,
            'angle' : 10,
            'snapToPixel' : false,
            'Stroke' : {
              'color' : 'rgba(255, 0, 255, 1.0)',
              'width' : 10
            },
            'rotation' : 90,
            'rotationWithView' : true,
            'AtlasManager' : {
              'initialSize' : 666,
              'maxSize' : 333,
              'space' : 3
            }
          },
        },
        'Text' : {
          'text' : '${idFeat}',
          'font' :  '48px serif',
          'offsetX' : 50,
          'offsetY' : 25,
          'scale' : 2,
          'rotateWithView' : 90,
          'rotation' : 90,
          'textAlign' : 'left',
          'textBaseline' : 'top',
          'Fill' : {
            'color' : 'rgba(255, 0, 255, 1.0)'
          }
        }
      },
      'version' : '1.3.0'
    };

    const layerOptions = JSON.parse(JSON.stringify(layerOptionsDiff));

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);

          const fctStyle = layer.olLayer.getStyle();
          const feat = new ol.Feature(
                        { geometry : new ol.geom.Polygon(
                            [[90 , 90] , [90 , 0] , [0 , 0] , [0 , 90] , [90 , 90]]
                          ),
                          idFeat : '666Test'
                        });
          const styleFeat = fctStyle(feat)[0];

          expect(styleFeat.getImage().getStroke().getColor())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.Stroke.color);
          expect(styleFeat.getImage().getStroke().getWidth())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.Stroke.width);
          expect(styleFeat.getImage().getFill().getColor())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.Fill.color);

          // expect(styleFeat.getImage().getPoints())
          // .toEqual(layerOptionsDiff.style.Image.RegularShape.points);
          expect(styleFeat.getImage().getRadius())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.radius);
          expect(styleFeat.getImage().getRadius2())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.radius2);
          expect(styleFeat.getImage().getAngle())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.angle);
          expect(styleFeat.getImage().getSnapToPixel())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.snapToPixel);
          expect(styleFeat.getImage().getRotation())
            .toEqual(layerOptionsDiff.style.Image.RegularShape.rotation);
          // expect(styleFeat.getImage().getRotateWithView())
          // .toEqual(layerOptionsDiff.style.Image.RegularShape.rotationWithView);
          expect(styleFeat.getText().getText()).toEqual(feat.get('idFeat'));
          expect(styleFeat.getText().getFont()).toEqual(layerOptionsDiff.style.Text.font);
          expect(styleFeat.getText().getOffsetX()).toEqual(layerOptionsDiff.style.Text.offsetX);
          expect(styleFeat.getText().getOffsetY()).toEqual(layerOptionsDiff.style.Text.offsetY);
          expect(styleFeat.getText().getScale()).toEqual(layerOptionsDiff.style.Text.scale);
          expect(styleFeat.getText().getRotateWithView())
            .toEqual(layerOptionsDiff.style.Text.rotateWithView);
          expect(styleFeat.getText().getTextAlign())
            .toEqual(layerOptionsDiff.style.Text.textAlign);
          expect(styleFeat.getText().getTextBaseline())
            .toEqual(layerOptionsDiff.style.Text.textBaseline);
          expect(styleFeat.getText().getFill().getColor())
            .toEqual(layerOptionsDiff.style.Text.Fill.color);

          return layer;
        }
      );

  }));

    it('create WFS layer with Icon ...', inject([LayerService], (service: LayerService) => {

    const layerOptionsDiff =  {
      'name' : 'WFS1',
      'type' : 'wfs',
      'source' : {
        'url' : 'prodADN/?service=WFS&version=1.1.0&request=GetFeature&' +
                  'typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857'
      },
      'style' : {
        'Image' : {
          'Icon' : {
            'anchor' : [1 , 1],
            'anchorOrigin' : 'bottom-left',
            'anchorXUnits' : 'pixels',
            'anchorYUnits' : 'pixels',
            'color' : 'rgba(255, 0, 255, 1.0)',
            'crossOrigin' : 'http://patate.com',
            'img' : '',
            'offset' : [1 , 1],
            'offsetOrigin' : 'bottom-left',
            'opacity' : 2,
            'scale' : 3,
            'snapToPixel' : false,
            'rotateWithView' : true,
            'rotation' : 90,
            'size' : [5 , 5],
            'imgSize' : [5 , 5],
            'src' : 'http://patate.com/image'
          }
        }
      },
      'version' : '1.3.0'
    };

    const layerOptions = JSON.parse(JSON.stringify(layerOptionsDiff));

    service.createLayer(layerOptions).subscribe(
        layer => {
          const p: any = layer.olLayer.getProperties();
          expect(layer).toBeTruthy();
          expect(p.source.getUrl()).toEqual(layerOptions.source.url);

          const fctStyle = layer.olLayer.getStyle();
          const feat = new ol.Feature(
                        { geometry : new ol.geom.Polygon(
                            [[90 , 90] , [90 , 0] , [0 , 0] , [0 , 90] , [90 , 90]]
                          ),
                          idFeat : '666Test'
                         });
          const styleFeat = fctStyle(feat)[0];

          expect(styleFeat.getImage().getOrigin()).toEqual([1 , -1]);
          // expect(styleFeat.getImage().getColor())
          // .toEqual(layerOptionsDiff.style.Image.Icon.color);
          expect(styleFeat.getImage().getRotateWithView())
            .toEqual(layerOptionsDiff.style.Image.Icon.rotateWithView);
          expect(styleFeat.getImage().getSnapToPixel())
            .toEqual(layerOptionsDiff.style.Image.Icon.snapToPixel);
          expect(styleFeat.getImage().getRotation())
            .toEqual(layerOptionsDiff.style.Image.Icon.rotation);
          expect(styleFeat.getImage().getOpacity())
            .toEqual(layerOptionsDiff.style.Image.Icon.opacity);
          expect(styleFeat.getImage().getScale()).toEqual(layerOptionsDiff.style.Image.Icon.scale);
          expect(styleFeat.getImage().getSize()).toEqual(layerOptionsDiff.style.Image.Icon.size);

          return layer;
        }
      );
  }));

});
