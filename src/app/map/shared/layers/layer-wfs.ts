import { Layer } from './layer';
import { WFSLayerOptions } from './layer-wfs.interface';

export const defaultStyle = {
  stroke: new ol.style.Stroke({
    color: 'rgba(0, 0, 255, 1.0)',
    width: 2
  })
};

export class WFSLayer extends Layer {

   public options: WFSLayerOptions;

   public olLayer: ol.layer.Vector;

   constructor(options: WFSLayerOptions) {
    super(options);
   }

   protected createOlLayer(): ol.layer.Vector {

    let sourceOptions = {};  

    if (!this.options.source.format) {
      sourceOptions['format'] = new ol.format.WFS();
    } else {
      Object.keys(this.options.source.format).map(
          (key: string) => {
            if (ol.format[key]) {
              sourceOptions[key.toLowerCase()] = new ol.format[key](this.options.source.format[key]);
            } else {
              // TODO Format non-supporté par OL3
            }
       });
    }

    sourceOptions['url'] = this.options.source.url ;
    
    if (!this.options.style) {
      this.options.style = defaultStyle;
    } else {
      Object.keys(this.options.style).map(
          (key: string) => {
            if (ol.style[key]) {
              this.options.style[key.toLowerCase()] =
                this.jsonOptionToOlObject(this.options.style[key], key);
              delete this.options.style[key];

               switch (key) {
                case 'Image':
                  this.options.style.image = this.options.style.image[Object.keys(this.options.style.image)[0]];
                  break;
              }
            } else {
              // TODO Style non-supporté par OL3
            }
       });
    }

   const WFSLayerOptions = Object.assign(this.options.view || {}, {
      style: new ol.style.Style(this.options.style),
      source: new ol.source.Vector(sourceOptions)
    });

    return new ol.layer.Vector(WFSLayerOptions);
  }

  protected generateId() {
    return undefined;
  }

  jsonOptionToOlObject(option, key) {

    Object.keys(option).map(
                (subKey: string) => {
                  if (Object.keys(ol.style).findIndex(value => { return value === subKey; }) > -1) {
                    option[subKey.toLowerCase()] =
                      this.jsonOptionToOlObject(option[subKey], subKey);
                    delete option[subKey];
                  }
                }, this);

    switch (key) {
      case 'Image':
        return option;
      default:
        return new ol.style[key](option);
    }
  }
}
