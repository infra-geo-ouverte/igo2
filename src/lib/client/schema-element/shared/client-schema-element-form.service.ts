import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { LanguageService } from '@igo2/core';
import {
  Form,
  FormField,
  FormFieldConfig,
  FormService
} from '@igo2/common';
import { IgoMap } from '@igo2/geo';

@Injectable()
export class ClientSchemaElementFormService {

  constructor(
    private formService: FormService,
    private languageService: LanguageService
  ) {}

  buildCreateForm(igoMap: IgoMap): Observable<Form> {
    const infoFields$ = zip(
      this.createIdField({options: {disabled: true}}),
      this.createTypeElementField(),
      this.createDescriptionField(),
      this.createEtiquetteField(),
      this.createAnneeImageField()
    );

    const geometryFields$ = zip(
      this.createGeometryField({inputs: {map: igoMap, geometryType: 'Polygon'}})
    );

    return zip(infoFields$, geometryFields$)
      .pipe(
        map((fields: [FormField[], FormField[]]) => {
          return this.formService.form([], [
            this.formService.group({name: 'geometry'}, fields[1]),
            this.formService.group({name: 'info'}, fields[0])
          ]);
        })
      );
  }

  buildUpdateForm(igoMap: IgoMap): Observable<Form> {
    return this.buildCreateForm(igoMap);
  }

  private createIdField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
    return of(this.createField({
      name: 'properties.idElementGeometrique',
      title: 'ID',
      options:  {
        cols: 1
      }
    }, partial));
  }

  private createTypeElementField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
    return of(this.createField({
      name: 'properties.typeElement',
      title: 'Type d\'élément',
      options:  {
        cols: 1,
        validator: Validators.required
      }
    }, partial));
  }

  private createDescriptionField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
    return of(this.createField({
      name: 'properties.description',
      title: 'Description',
      options:  {
        cols: 2
      }
    }, partial));
  }

  private createEtiquetteField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
    return of(this.createField({
      name: 'properties.etiquette',
      title: 'Etiquette',
      options:  {
        cols: 1
      }
    }, partial));
  }

  private createAnneeImageField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
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

  private createGeometryField(partial?: Partial<FormFieldConfig>): Observable<FormField> {
    return of(this.createField({
      name: 'geometry',
      title: 'Géometrie',
      options:  {
        cols: 2,
        validator: Validators.required
      },
      type: 'geometry',
      inputs: {}
    }, partial));
  }

  private createField(config: FormFieldConfig, partial?: Partial<FormFieldConfig>): FormField {
    config = this.formService.extendFieldConfig(config, partial || {});
    return this.formService.field(config);
  }

}
