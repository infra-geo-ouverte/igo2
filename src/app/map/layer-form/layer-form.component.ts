import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Layer, LayerOptions } from '../shared/layers';

@Component({
  selector: 'igo-layer-form',
  templateUrl: './layer-form.component.html',
  styleUrls: ['./layer-form.component.styl']
})
export class LayerFormComponent implements OnInit {

  @Input() layer: Layer;

  form: FormGroup;
  submitted: boolean;

  get title () {
    return (<FormControl>this.form.controls['title']);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [
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
    this.title.setValue(this.layer.title, {onlySelf: true});
  }

}
