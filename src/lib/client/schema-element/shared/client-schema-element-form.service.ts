import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Validators } from '@angular/forms';

import {
  EntityFormTemplate,
  EntityFormField,
  EntityFormFieldAnyInput
} from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';

type PartialFormField = Partial<EntityFormField<EntityFormFieldAnyInput>>;

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementFormService {

  constructor() {}

  buildCreateSurfaceForm(igoMap: IgoMap): Observable<EntityFormTemplate> {
    const fields$ = zip(
      this.createIdField({options: {disabled: true}}),
      this.createTypeElementField(),
      this.createDescriptionField(),
      this.createEtiquetteField(),
      this.createAnneeImageField(),
      this.createGeometryField({input: {map: igoMap, geometryType: 'Polygon'}})
    );
    return fields$.pipe(
      map((fields: EntityFormField[]) => {
        return Object.create({fields});
      })
    );
  }

  buildUpdateSurfaceForm(igoMap: IgoMap): Observable<EntityFormTemplate> {
    return this.buildCreateSurfaceForm(igoMap);
  }

  buildDeleteSurfaceForm(): Observable<EntityFormTemplate> {
    return of({fields: []});
  }

  private createIdField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'properties.idElementGeometrique',
      title: 'ID',
      options:  {
        cols: 1
      }
    }, partial));
  }

  private createTypeElementField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'properties.typeElement',
      title: 'Type d\'élément',
      options:  {
        cols: 1,
        validator: Validators.required
      }
    }, partial));
  }

  private createDescriptionField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'properties.description',
      title: 'Description',
      options:  {
        cols: 2,
        validator: Validators.required
      }
    }, partial));
  }

  private createEtiquetteField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'properties.etiquette',
      title: 'Etiquette',
      options:  {
        cols: 1
      }
    }, partial));
  }

  private createAnneeImageField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'properties.anneeImage',
      title: 'Année d\image',
      options:  {
        cols: 1,
        validator: Validators.compose([
          Validators.required,
          Validators.pattern(/^(20[\d]{2})$/)
        ])
      }
    }, partial));
  }

  private createGeometryField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'geometry',
      title: 'Geometry',
      input: {
        type: 'geometry'
      }
    }, partial));
  }

  private createField(base: EntityFormField, partial?: PartialFormField): EntityFormField {
    partial = partial || {};
    const options = Object.assign({}, base.options || {}, partial.options || {});
    const input = Object.assign({}, base.input || {}, partial.input || {});
    return Object.assign(base, {options, input});
  }

}
