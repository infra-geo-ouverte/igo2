import { Feature } from 'src/lib/feature';

export interface ClientSchemaElementApiConfig {
  save: string;
  point: ClientSchemaElementPointApiConfig;
  line: ClientSchemaElementLineApiConfig;
  surface: ClientSchemaElementSurfaceApiConfig;
}

export interface ClientSchemaElementPointApiConfig {
  list: string;
}

export interface ClientSchemaElementLineApiConfig {
  list: string;
}

export interface ClientSchemaElementSurfaceApiConfig {
  list: string;
}

export interface ClientSchemaElementProperties {
  idElementGeometrique: string;
  etiquette: string;
  description: string;
  typeElement: string;
  descriptionTypeElement: string;
  anneeImage: number;
  timbreMaj: string;
  usagerMaj: string;
}

export interface ClientSchemaElementPointProperties extends ClientSchemaElementProperties {}

export interface ClientSchemaElementLineProperties extends ClientSchemaElementProperties {}

export interface ClientSchemaElementSurfaceProperties extends ClientSchemaElementProperties {}

export interface ClientSchemaElementPoint extends Feature {
  properties: ClientSchemaElementPointProperties;
}

export interface ClientSchemaElementLine extends Feature {
  properties: ClientSchemaElementLineProperties;
}

export interface ClientSchemaElementSurface extends Feature {
  properties: ClientSchemaElementSurfaceProperties;
}

export interface ClientSchemaElementPointListResponseItem extends ClientSchemaElementPoint {}

export type ClientSchemaElementPointListResponse = ClientSchemaElementPointListResponseItem[];

export interface ClientSchemaElementLineListResponseItem extends ClientSchemaElementLine {}

export type ClientSchemaElementLineListResponse = ClientSchemaElementLineListResponseItem[];

export interface ClientSchemaElementSurfaceListResponseItem extends ClientSchemaElementSurface {}

export type ClientSchemaElementSurfaceListResponse = ClientSchemaElementSurfaceListResponseItem[];

export interface  ClientSchemaElementPointListResponseItem extends ClientSchemaElementPoint {}

export interface  ClientSchemaElementLineListResponseItem extends ClientSchemaElementLine {}

export interface  ClientSchemaElementSurfaceListResponseItem extends ClientSchemaElementSurface {}
