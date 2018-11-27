import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Entity, EntityFormModel, EntityFormField } from '../shared';

@Component({
  selector: 'fadq-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormComponent implements OnChanges {

  public form: FormGroup;

  @Input()
  get entity(): Entity {
    return this._entity;
  }
  set entity(value: Entity) {
    this._entity = value;
  }
  private _entity: Entity;

  @Input()
  get model(): EntityFormModel {
    return this._model;
  }
  set model(value: EntityFormModel) {
    this._model = value;
  }
  private _model: EntityFormModel;

  @Output() submitForm = new EventEmitter<{
    entity: Entity;
    data: { [key: string]: any };
  }>();

  @Output() cancel = new EventEmitter();

  get submitLabel(): string {
    return this.model.submitLabel ? this.model.submitLabel : 'OK';
  }

  get cancelLabel(): string {
    return this.model.cancelLabel ? this.model.cancelLabel : 'CANCEL';
  }

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const model = changes.model;
    const entity = changes.entity;

    if (model && model.currentValue !== model.previousValue) {
      this.createForm();
    } else if (entity && entity.currentValue !== entity.previousValue) {
      this.populateForm();
    }

    this.cdRef.detectChanges();
  }

  onSubmit(data: { [key: string]: any}) {
    this.submitForm.emit({entity: this.entity, data});
  }

  onCancelButtonClick() {
    this.cancel.emit();
  }

  getFieldControl(field: EntityFormField): FormControl {
    return this.form.get(field.name) as FormControl;
  }

  getFieldColSpan(field: EntityFormField): number {
    let colSpan = 2;
    if (field.cols && field.cols > 0) {
      colSpan = Math.min(field.cols, 2);
    }

    return colSpan;
  }

  private createForm() {
    const controls = {};
    this.model.fields.forEach((field: EntityFormField) => {
      controls[field.name] = this.createFormControl(field);
    });

    this.form = this.formBuilder.group(controls);
    this.populateForm();
  }

  private createFormControl(field: EntityFormField): FormControl {
    const state = Object.assign({}, field);
    const control = this.formBuilder.control(state);
    control.setValue('');
    return control;
  }

  private populateForm() {
    if (this.entity === undefined) {
      this.form.reset();
      return;
    }
    this.model.fields.forEach((field: EntityFormField) => {
      const control = this.getFieldControl(field);
      control.setValue(this.entity[field.name]);
    });
  }
}
