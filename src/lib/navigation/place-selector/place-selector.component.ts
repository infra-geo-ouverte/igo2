import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

import { Feature, FeatureMotion, Overlay } from '@igo2/geo';
import { Place, PlaceCategory, PlaceService } from '../shared';

@Component({
  selector: 'fadq-place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceSelectorComponent implements OnInit {

  selectedCategory: PlaceCategory;

  places: Place[] = [];

  filteredPlaces$: Observable<Place[]>;

  placeControl = new FormControl();

  overlayFeature: Feature;

  @Input() overlay: Overlay;

  @Input() categories: PlaceCategory[];

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.filteredPlaces$ = this.placeControl.valueChanges
      .pipe(
        startWith<string | Place | undefined>(undefined),
        map(value => {
          if (value === undefined) { return ''; }
          return typeof value === 'string' ? value : value.title;
        }),
        map(title => title ? this.filterPlacesByTitle(title) : this.places.slice())
      );
  }

  onCategorySelect(category: PlaceCategory) {
    this.selectedCategory = category;
    this.placeService.getPlacesByCategory(category)
      .subscribe(places => {
        this.places = places;
        this.clearPlace();
      });
  }

  onPlaceSelect(place: Place) {
    this.placeService.getPlaceFeatureByCategory(this.selectedCategory, place)
      .subscribe((feature: Feature) => this.setOverlayFeature(feature));
  }

  onOverlayButtonClick() {
    this.setOverlayFeature(this.overlayFeature);
  }

  onClearButtonClick() {
    this.clearPlace();
  }

  getPlaceTitle(place?: Place) {
    return place ? place.title : undefined;
  }

  private clearPlace() {
    this.clearFeature();
    this.placeControl.setValue(undefined);
  }

  private clearFeature() {
    this.setOverlayFeature(undefined);
  }

  private setOverlayFeature(feature?: Feature) {
    if (feature === undefined) {
      this.overlay.clear();
    } else {
      this.overlay.setFeatures([feature], FeatureMotion.Zoom);
    }
    this.overlayFeature = feature;
  }

  private filterPlacesByTitle(title: string): Place[] {
    const filterValue = title.toLowerCase();
    return this.places.filter(place => {
      return place.title.toLowerCase().indexOf(filterValue) === 0;
    });
  }

}
