import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-immeuble-card',
  templateUrl: './immeuble-card.component.html',
  styleUrls: ['./immeuble-card.component.scss']
})
export class ImmeubleCardComponent {
  @Input() item: any;
}
