import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'igo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent {

  @Output('key') key = new EventEmitter<string>();

  value: string;

  constructor() { }

  onKey(event: KeyboardEvent) {
    this.value = (<HTMLInputElement>event.target).value;
    this.key.emit(this.value);
  }

}
