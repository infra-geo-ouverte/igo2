import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
export class PlaceSelectorComponent {

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
        startWith<string | Place>(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this.filterPlacesByLabel(label) : this.places.slice())
      );
  }

  selectCategory(category: PlaceCategory) {
    this.selectedCategory = category;
    this.placeService.getPlacesByCategory(category)
      .subscribe(places => {
        this.places = places;
        this.placeControl.setValue('');
      });
  }

  selectPlace(place: Place) {
    this.placeService.getPlaceFeatureByCategoryAndId(this.selectedCategory, place.id)
      .subscribe(feature => this.handlePlaceFeature(feature));
  }

  displayPlace(place?: Place) {
    return place ? place.label : undefined;
  }

  private filterPlacesByLabel(label: string): Place[] {
    const filterValue = label.toLowerCase();

    return this.places.filter(place => {
      return place.label.toLowerCase().indexOf(filterValue) === 0
    });
  }

  private handlePlaceFeature(feature: Feature | null) {
    if (feature === null) {
      this.overlayService.clear();
    } else {
      this.overlayService.setFeatures([feature], OverlayAction.Zoom);
    }
  }

}
