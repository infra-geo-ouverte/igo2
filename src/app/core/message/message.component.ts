import { Component } from '@angular/core';

@Component({
  selector: 'igo-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.styl'],
})

export class MessageComponent {

  public options = {
    timeOut: 500000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 100,
    maxStack: 3,
    preventDuplicates: true
  };

  constructor() { }

}
