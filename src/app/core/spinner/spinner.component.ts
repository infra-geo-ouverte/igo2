import { Component, OnInit } from '@angular/core';

import { RequestService } from '../request.service';

@Component({
  selector: 'igo-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.styl'],
})
export class SpinnerComponent implements OnInit {

  shown: boolean = false;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.requests.subscribe((count: number) => {
      this.shown = count > 0;
    });
  }

}
