import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

import * as olformat from 'ol/format';
import { OlFeature } from 'ol/Feature';

import { Feature } from '@igo2/geo';

import {
  FeatureImportInvalidFileError,
  FeatureImportUnreadableFileError
} from './feature-import.errors';

@Injectable({
  providedIn: 'root'
})
export class FeatureImportService {

  static allowedMimeTypes = [
    'application/gml+xml',
    'application/vnd.google-earth.kml+xml',
    'application/gpx+xml',
    'application/json'
  ];

  static allowedExtensions = [
    'geojson',
    'kml',
    'gpx',
    'json'
  ];

  public import(file: File, projectionIn = 'EPSG:4326', projectionOut = 'EPSG:4326'): Observable<Feature[]> {
    return this.importAsync(file, projectionIn, projectionOut);
  }

  private validateFile(file: File) {
    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type;
    if (
      FeatureImportService.allowedMimeTypes.indexOf(mimeType) < 0 &&
      FeatureImportService.allowedExtensions.indexOf(extension) < 0
    ) {
      throw new FeatureImportInvalidFileError();
    }
  }

  private importAsync(file: File, projectionIn: string, projectionOut): Observable<Feature[]> {
    const doImport = (observer: Observer<Feature[]>) => {
      try  {
        this.validateFile(file);
      } catch (e) {
        observer.error(e);
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          const features = this.parseFeatures(
            file,
            event.target.result,
            projectionIn,
            projectionOut
          );
          observer.next(features);
        } catch (e) {
          observer.error(new FeatureImportUnreadableFileError());
        }

        observer.complete();
      };

      reader.onerror = evt => {
        observer.error(new FeatureImportUnreadableFileError());
      };

      reader.readAsText(file, 'UTF-8');
    };

    return new Observable(doImport);
  }

  private parseFeatures(file: File, data: string, projectionIn: string, projectionOut: string): Feature[] {
    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type;

    const GeoJSON = new olformat.GeoJSON();

    let format;
    if (mimeType === 'application/vnd.google-earth.kml+xml') {
      format = new olformat.KML();
    } else if (mimeType === 'application/gml+xml') {
      format = new olformat.GML();
    } else if (mimeType === 'application/gpx+xml') {
      format = new olformat.GPX();
    } else {
      switch (extension) {
        case 'kml':
          format = new olformat.KML();
          break;
       case 'gpx':
          format = new olformat.GPX();
          break;
        case 'gml':
          format = new olformat.GML();
          break;
        default:
          format = GeoJSON;
          break;
      }
    }

    const olFeatures = format.readFeatures(data, {
      dataProjection: projectionIn,
      featureProjection: projectionOut
    });
    const features = olFeatures.map((olFeature: OlFeature) => {
      return Object.assign(GeoJSON.writeFeatureObject(olFeature), {
        projection: projectionOut
      });
    });

    return features;
  }
}
