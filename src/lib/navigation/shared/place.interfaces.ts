export interface PlaceCategory {
  id?: string;
  title: string;
  collection: PlaceCollectionApi;
  feature: PlaceFeatureApi;
}

export interface PlaceCollectionApi {
  uri: string;
  resultsProperty?: string;
  idProperty?: string;
  titleProperty?: string;
  title?: string;
}

export interface PlaceFeatureApi {
  uri: string;
}

export interface Place {
  id: string;
  title: string;
}

export interface PlaceMapper {
  idProperty: string;
  titleProperty?: string;
  title?: string;
}
