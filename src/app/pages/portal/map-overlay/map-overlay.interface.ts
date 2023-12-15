export interface MapOverlay {
  media: Array<string> /* Media device to display the mapOverlay
                            - options: mobile
                                       tablet
                                       desktop
                            - default: desktop*/;
  cssClass: string /* Css class to define position of the element
                            - options:  top-left
                                        center-left
                                        bottom-left
                                        top-center
                                        center-center
                                        bottom-center
                                        top-right
                                        center-right
                                        bottom-right
  */;
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
