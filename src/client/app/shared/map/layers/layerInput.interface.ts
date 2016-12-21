export interface ILayerInput {
  protocole: string;
}

export interface IOSMInput extends ILayerInput {}

export interface IWMSInput extends ILayerInput {
  url: string;
  name: string;
}
