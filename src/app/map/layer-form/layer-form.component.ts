import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Layer, LayerOptions } from '../shared/layers/layer';

@Component({
  selector: 'igo-layer-form',
  templateUrl: './layer-form.component.html',
  styleUrls: ['./layer-form.component.styl']
})
export class LayerFormComponent implements OnInit {

  @Input() layer: Layer;

  form: FormGroup;
  submitted: boolean;

  get name () {
    return (<FormControl>this.form.controls['name']);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });

    this.populate();
  }

  save(data: LayerOptions, isValid: boolean) {
    this.submitted = true;
    console.log(data, isValid);
  }

  private populate() {
    this.name.setValue(this.layer.options.name, {onlySelf: true});
  }

}
