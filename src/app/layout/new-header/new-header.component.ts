import { Component, OnInit } from '@angular/core';

import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss']
})
export class NewHeaderComponent implements OnInit {
  searchBarOpened = false;

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.searchBarService.searchBarOpened.subscribe(
      (t) => (this.searchBarOpened = t)
    );
  }

  onToggleSearchBar() {
    this.searchBarService.toggle();
  }
}
