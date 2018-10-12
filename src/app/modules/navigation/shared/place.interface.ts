export interface PlaceCategory {
  id: string;
  label: string;
  collection: PlaceCollectionApi;
  feature: PlaceFeatureApi;
  featureUri: string;
}

export interface PlaceCollectionApi {
  uri: string;
  resultsProperty?: string;
  idProperty?: string;
  labelProperty?: string;
}

export interface PlaceFeatureApi {
  uri: string;
}

export interface Place {
  id: string;
  label: string;
}

export interface PlaceMapper {
  id: string;
  label: string;  
}