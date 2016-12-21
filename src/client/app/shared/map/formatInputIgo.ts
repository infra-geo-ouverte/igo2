/// <reference path="../../../../../node_modules/@types/openlayers/index.d.ts" />
// TODO: Bonne pratique d'utiliser reference pour les types? sinon l'ajouter dans src/client/tsconfig.json ?

import { ILayerInput, IOSMInput, IWMSInput } from './layers/layerInput.interface';
import { IViewInput } from './view/viewInput.interface';

export class FormatInputIgo {

  public readView(viewInput: IViewInput): ol.View {
    return new ol.View({
      projection: viewInput.projection || 'EPSG:3857',
      center: viewInput.center || ol.proj.fromLonLat([-73.5, 47.168464955013], "EPSG:900913"),
      zoom: viewInput.zoom || 7
    });
  }

  public readLayers(layerInputArray: ILayerInput[]): ol.layer.Base[] {
    let layers: ol.layer.Base[] = [];

    for (let layerInput of layerInputArray) {
      layers.push(this.readLayer(layerInput));
    }

    return layers;
  }

  public readLayer(layerInput: ILayerInput): ol.layer.Base {
    if (!layerInput.protocole) {
      // TODO avertir l'utilisateur en mode debug
      return undefined;
    }

    interface IProtocoleMap {
      [key: string]: (layerInput: ILayerInput) => ol.layer.Base;
    }

    let functionProtocoleMap: IProtocoleMap = {
      OSM: this.createLayerOSM,
      WMS: this.createLayerWMS
    };

    return functionProtocoleMap[layerInput.protocole](layerInput);
  }

  private createLayerOSM(layerInput: IOSMInput): ol.layer.Tile {
    return new ol.layer.Tile({
      source: new ol.source.OSM()
    });
  }

  private createLayerWMS(layerInput: IWMSInput): ol.layer.Image {
     // TODO avertir l'utilisateur en mode debug si manque url ou name
    return new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: layerInput.url,
        projection: undefined,
        params: { 'LAYERS': layerInput.name }
      })
    });
  }

}
