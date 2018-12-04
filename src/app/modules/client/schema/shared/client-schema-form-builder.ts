import { Validators } from '@angular/forms';

import { EntityFormField, EntityFormFieldOptions } from 'src/app/modules/entity';

export class ClientSchemaFormBuilder {

  static baseFields = {
    id: {
      title: 'Numéro de schéma',
      cols: 1
    },
    type: {
      title: 'Type de schéma',
      cols: 1,
      validator: Validators.required
    },
    description: {
      title: 'Description',
      cols: 2,
      validator: Validators.required
    },
    annee: {
      title: 'Année',
      cols: 1,
      validator: Validators.compose([
        Validators.required,
        Validators.pattern(/^(20[\d]{2})$/)
      ])
    },
    etat: {
      title: 'État',
      cols: 1
    }
  };

  static getCreateTemplate() {
    return {
      fields: [
        this.createField('id', {disabled: true}),
        this.createField('type'),
        this.createField('description'),
        this.createField('annee'),
        this.createField('etat')
      ]
    };
  }

  static getUpdateTemplate() {
    return {
      fields: [
        this.createField('id', {disabled: true}),
        this.createField('type'),
        this.createField('description'),
        this.createField('annee'),
        this.createField('etat')
      ]
    };
  }

  static getDeleteTemplate() {
    return {
      fields: []
    };
  }

  private static createField(name: string, options?: EntityFormFieldOptions): EntityFormField {
    const baseField = this.baseFields[name] || {};
    return Object.assign({}, {name}, baseField, options || {});
  }
}
