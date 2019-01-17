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

import {
  Entity,
  EntityFormTemplate,
  EntityFormField,
  EntityFormSubmitEvent,
  getEntityProperty
} from '../shared';

/**
 * A configurable form, optionnally bound to an entity
 * (for example in case of un update). Submitting that form
 * emits an event with the form data but no other operation is performed.
 */
@Component({
  selector: 'fadq-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormComponent implements OnChanges {

  /**
   * Angular form group
   * @internal
   */
  public form: FormGroup;

  /**
   * Entity or undefined
   */
  @Input() entity: Entity | undefined;

  /**
   * Form template
   */
  @Input()
  set template(value: EntityFormTemplate) {
    // Disallow changing the template
    if (this.template !== undefined) {
      return;
    }
    this._template = value;
  }
  get template(): EntityFormTemplate { return this._template; }
  private _template: EntityFormTemplate;

  /**
   * Event emitted when the form is submitted
   */
  @Output() submitForm = new EventEmitter<EntityFormSubmitEvent>();

  /**
   * Event emitted when the cancel button is clicked
   */
  @Output() cancel = new EventEmitter();

  /**
   * Submit button label
   * @internal
   */
  get submitLabel(): string {
    return this.template.submitLabel ? this.template.submitLabel : 'OK';
  }

  /**
   * Cancel button label
   * @internal
   */
  get cancelLabel(): string {
    return this.template.cancelLabel ? this.template.cancelLabel : 'CANCEL';
  }

  /**
   * Whether the form is dirty
   * @internal
   */
  get dirty(): boolean { return this.form ? this.form.dirty : false; }

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Is the entity or the template change, recreate the form or repopulate it.
   * @param changes
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.dirty) {
      return;
    }

    const template = changes.template;
    const entity = changes.entity;

    if (template && template.currentValue !== template.previousValue) {
      this.createForm();
    } else if (entity && entity.currentValue !== entity.previousValue) {
      this.populateForm();
    }

    this.cdRef.detectChanges();
  }

  /**
   * When the form is submitted, emit an event
   * @param data Form data
   * @internal
   */
  onSubmit(data: { [key: string]: any}) {
    this.submitForm.emit({form: this.form, entity: this.entity, data});
  }

  /**
   * When the cancel button is clicked, emit an event
   * @internal
   */
  onCancelButtonClick() {
    this.cancel.emit();
  }

  /**
   * Clear form
   */
  clear() {
    this.form.reset();
  }

  /**
   * Return the form control bound to a field
   * @param field Field
   * @returns Angular form control
   */
  getFieldControl(field: EntityFormField): FormControl {
    return this.form.controls[field.name] as FormControl;
  }

  /**
   * Return the number of columns a field should occupy.
   * The maximum allowed is 2, even if the form template says more.
   * @param field Field
   * @returns Number of columns
   * @internal
   */
  getFieldColSpan(field: EntityFormField): number {
    let colSpan = 2;
    const options = field.options || {};
    if (options.cols && options.cols > 0) {
      colSpan = Math.min(options.cols, 2);
    }

    return colSpan;
  }

  /**
   * Create the angular form and populate it
   */
  private createForm() {
    const controls = {};
    this.template.fields.forEach((field: EntityFormField) => {
      controls[field.name] = this.createFormControl(field);
    });

    this.form = this.formBuilder.group(controls);
    this.populateForm();
  }

  /**
   * Create the form control of a field
   * @param field: Field
   * @returns Angular form control
   */
  private createFormControl(field: EntityFormField): FormControl {
    const options = field.options || {};
    const state = Object.assign({value: ''}, {
      disabled: options.disabled
    });
    const control = this.formBuilder.control(state);
    control.setValidators(options.validator);

    return control;
  }

  /**
   * Populate the form from the entity
   */
  private populateForm() {
    if (this.entity === undefined) {
      this.form.reset();
      return;
    }
    this.template.fields.forEach((field: EntityFormField) => {
      const control = this.getFieldControl(field);
      control.setValue(getEntityProperty(this.entity, field.name));
    });
  }
}
