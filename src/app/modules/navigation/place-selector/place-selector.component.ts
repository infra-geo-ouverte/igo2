import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

import { Feature, OverlayService, OverlayAction } from '@igo2/geo';
import {
  Place,
  PlaceCategory
} from '../shared/place.interface';
import { PlaceService } from '../shared/place.service';


@Component({
  selector: 'fadq-place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceSelectorComponent implements OnInit {

  @Input()
  get categories(): PlaceCategory[] {
    return this._categories;
  }
  set categories(value: PlaceCategory[]) {
    this._categories = value;
  }
  private _categories: PlaceCategory[];

  public selectedCategory: PlaceCategory;
  public places: Place[] = [];
  public filteredPlaces$: Observable<Place[]>;
  public placeControl = new FormControl();

  constructor(
    private placeService: PlaceService,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.filteredPlaces$ = this.placeControl.valueChanges
      .pipe(
        startWith<string | Place | undefined>(undefined),
        map(value => {
          if (value === undefined) {
            return '';
          }
          return typeof value === 'string' ? value : value.title;
        }),
        map(title => title ? this.filterPlacesByTitle(title) : this.places.slice())
      );
  }

  selectCategory(category: PlaceCategory) {
    this.selectedCategory = category;
    this.placeService.getPlacesByCategory(category)
      .subscribe(places => {
        this.places = places;
        this.clearPlace();
      });
  }

  selectPlace(place: Place) {
    this.placeService.getPlaceFeatureByCategoryAndId(this.selectedCategory, place.id)
      .subscribe(feature => this.setOverlayFeature(feature));
  }

  setOverlayFeature(feature: Feature | null) {
    if (feature === undefined || feature === null) {
      this.clearFeature();
    } else {
      this.overlayService.setFeatures([feature], OverlayAction.Zoom);
    }
  }

  clearPlace() {
    this.clearFeature();
    this.placeControl.setValue(undefined);
  }

  displayPlace(place?: Place) {
    return place ? place.title : undefined;
  }

  private clearFeature() {
    this.overlayService.clear();
  }

  private filterPlacesByTitle(title: string): Place[] {
    const filterValue = title.toLowerCase();
    return this.places.filter(place => {
      return place.title.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
