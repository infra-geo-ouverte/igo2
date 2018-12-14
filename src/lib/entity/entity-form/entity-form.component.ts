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

import { Entity, EntityFormTemplate, EntityFormField } from '../shared';

@Component({
  selector: 'fadq-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormComponent implements OnChanges {

  public form: FormGroup;

  @Input()
  get entity(): Entity | undefined {
    return this._entity;
  }
  set entity(value: Entity | undefined) {
    this._entity = value;
  }
  private _entity: Entity | undefined;

  @Input()
  get template(): EntityFormTemplate {
    return this._template;
  }
  set template(value: EntityFormTemplate) {
    this._template = value;
  }
  private _template: EntityFormTemplate;

  @Output() submitForm = new EventEmitter<{
    entity: Entity | undefined;
    data: { [key: string]: any };
  }>();

  @Output() cancel = new EventEmitter();

  get submitLabel(): string {
    return this.template.submitLabel ? this.template.submitLabel : 'OK';
  }

  get cancelLabel(): string {
    return this.template.cancelLabel ? this.template.cancelLabel : 'CANCEL';
  }

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const template = changes.template;
    const entity = changes.entity;

    if (template && template.currentValue !== template.previousValue) {
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
    return this.form.controls[field.name] as FormControl;
  }

  getFieldColSpan(field: EntityFormField): number {
    let colSpan = 2;

    const options = field.options || {};
    if (options.cols && options.cols > 0) {
      colSpan = Math.min(options.cols, 2);
    }

    return colSpan;
  }

  private createForm() {
    const controls = {};
    this.template.fields.forEach((field: EntityFormField) => {
      controls[field.name] = this.createFormControl(field);
    });

    this.form = this.formBuilder.group(controls);
    this.populateForm();
  }

  private createFormControl(field: EntityFormField): FormControl {
    const options = field.options || {};
    const state = Object.assign({value: ''}, {
      disabled: options.disabled
    });
    const control = this.formBuilder.control(state);
    control.setValidators(options.validator);

    return control;
  }

  private populateForm() {
    if (this.entity === undefined) {
      this.form.reset();
      return;
    }
    this.template.fields.forEach((field: EntityFormField) => {
      const control = this.getFieldControl(field);
      control.setValue(this.entity[field.name]);
    });
  }
}
