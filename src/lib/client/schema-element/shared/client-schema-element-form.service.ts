import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { LanguageService } from '@igo2/core';
import {
  Form,
  FormField,
  FormFieldConfig,
  FormFieldSelectInputs,
  FormService
} from '@igo2/common';
import { IgoMap } from '@igo2/geo';

@Injectable()
export class ClientSchemaElementFormService {

  constructor(
    private formService: FormService,
    private languageService: LanguageService
  ) {}

  buildCreateForm(igoMap: IgoMap, geometryTypes: string[]): Observable<Form> {
    const geometryFields$ = zip(
      this.createGeometryField({inputs: {
        map: igoMap,
        geometryTypes,
        geometryType: geometryTypes.length > 0 ? geometryTypes[0] : undefined
      }})
    );

    const infoFields$ = zip(
      this.createIdField({options: {disabled: true}}),
      this.createTypeElementField(),
      this.createDescriptionField(),
      this.createEtiquetteField(),
      this.createAnneeImageField()
    );

    return zip(geometryFields$, infoFields$)
      .pipe(
        map((fields: [FormField[], FormField[]]) => {
          return this.formService.form(fields[0], [
            this.formService.group({name: 'info'}, fields[1])
          ]);
        })
      );
  }

  buildUpdateForm(igoMap: IgoMap, geometryTypes: string[]): Observable<Form> {
    return this.buildCreateForm(igoMap, geometryTypes);
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
      inputs: {
        geometryTypeField: true,
        drawGuideField: true,
        drawGuide: 0,
        drawGuidePlaceholder: 'Guide d\'aide au traçage'
      }
    }, partial));
  }

  private createTypeElementField(
    partial?: Partial<FormFieldConfig>
  ): Observable<FormField<FormFieldSelectInputs>> {

    return of(this.createField({
      name: 'properties.typeElement',
      title: 'Type d\'élément',
      type: 'select',
      options:  {
        cols: 1,
        validator: Validators.required
      },
      inputs: {
        choices: new BehaviorSubject([])
      }
    }, partial) as FormField<FormFieldSelectInputs>);
  }

  private createField(config: FormFieldConfig, partial?: Partial<FormFieldConfig>): FormField {
    config = this.formService.extendFieldConfig(config, partial || {});
    return this.formService.field(config);
  }
}
