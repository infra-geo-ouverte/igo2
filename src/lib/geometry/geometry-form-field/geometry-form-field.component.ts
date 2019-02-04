import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import OlGeometryType from 'ol/geom/GeometryType';

import { IgoMap } from 'src/lib/map';
import { FormFieldComponent } from 'src/lib/form';

/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
 */
@FormFieldComponent('geometry')
@Component({
  selector: 'fadq-geometry-form-field',
  templateUrl: './geometry-form-field.component.html',
  styleUrls: ['./geometry-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeometryFormFieldComponent {

  public buffer$: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * The field's form control
   */
  @Input() formControl: FormControl;

   /**
   * The map to draw the geometry on
   */
  @Input() map: IgoMap;

  /**
   * The geometry type
   */
  @Input() geometryType: OlGeometryType;

  /**
   * The buffer around the mouse pointer to help drawing
   */
  @Input()
  set buffer(value: number) { this.buffer$.next(value); }
  get buffer(): number { return this.buffer$.value; }

  onBufferChange(buffer: number) {
    this.buffer = buffer;
  }

}
