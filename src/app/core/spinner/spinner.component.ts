import { Component, OnInit } from '@angular/core';

import { Observer } from '../../utils/observer';
import { RequestService } from '../request.service';

@Component({
  selector: 'igo-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.styl'],
})
export class SpinnerComponent extends Observer implements OnInit {

  shown: boolean = false;

  constructor(private requestService: RequestService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.requestService.requests.subscribe((count: number) => {
        this.shown = count > 0;
      }));
  }

}
