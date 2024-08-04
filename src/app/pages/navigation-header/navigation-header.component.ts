import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent {
  more = false;

  onToggleMore() {
    this.more = !this.more;
  }
}
