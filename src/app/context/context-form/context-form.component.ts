import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Context } from '../shared/context.interface';

@Component({
  selector: 'igo-context-form',
  templateUrl: './context-form.component.html',
  styleUrls: ['./context-form.component.styl']
})
export class ContextFormComponent implements OnInit {

  @Input() context: Context;

  form: FormGroup;
  submitted: boolean;

  get title () {
    return (<FormControl>this.form.controls['title']);
  }

  get description () {
    return (<FormControl>this.form.controls['description']);
  }

  get uri () {
    return (<FormControl>this.form.controls['uri']);
  }

  get scope () {
    return (<FormControl>this.form.controls['scope']);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: '',
      uri: '',
      scope: '',
    });

    this.populate();
  }

  saveProperties(data: Context, isValid: boolean) {
    this.submitted = true;
    console.log(data, isValid);
  }

  savePropertiesAndMap(data: Context, isValid: boolean) {
    this.submitted = true;
    console.log(data, isValid);
  }

  private populate() {
    this.title.setValue(this.context.title, {onlySelf: true});
    this.description.setValue(this.context.description, {onlySelf: true});
    this.uri.setValue(this.context.uri, {onlySelf: true});
    this.scope.setValue(this.context.scope, {onlySelf: true});
  }

}
