export interface ILayerResult {
  id: string;
  source: ILayerResultSource;
  highlight: ILayerResultHighlight;
}

export interface ILayerResultSource {
  title: string;
  groupTitle: string;
  abstract: string;
  format: 'wms' | 'wfs';
  url: string;
  type: string;
  name: string;
}

export interface ILayerResultHighlight {
  title: string;
}

export interface ILayerResponse {
  items: ILayerResult[];
}
