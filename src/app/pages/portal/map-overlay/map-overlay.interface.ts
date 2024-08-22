import { Media } from '@igo2/core/media';

import { MapOverlayCssClass } from './map-overlay.enum';

export interface MapOverlay {
  /**
   * Media device to display the mapOverlay
   * Desktop is the default value.
   */
  media: Array<Media>;
  /**
   * Css class to define position of the element
   */
  cssClass: MapOverlayCssClass;
  fixed?: boolean; // Is element is fixed, won't be affect by animation, default to false
  link?: string; // Link to open when element is clicked
  imgSrc?: string; // source of the image to show
  imgSize?: string; // Size of the image
  text?: string; // text to show before image
  fontSize?: string; // Font size to display text
  alt?: string; // alternate text for an image if the image cannot be displayed
  marginLeft?: string; // Margin to add to the left of the element
  marginRight?: string; // Margin to add to the right of the element
  marginTop?: string; // Margin to add to the top of the element
  marginBottom?: string; // Margin to add to the bottom of the element
}
