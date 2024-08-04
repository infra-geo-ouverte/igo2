import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { SearchBarService } from 'src/app/services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SearchBarComponent implements OnInit {
  opened = false;
  constructor(private readonly searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.searchBarService.searchBarOpened.subscribe((t) => (this.opened = t));
  }

  onToggleSearch() {
    this.searchBarService.toggle();
  }
}
