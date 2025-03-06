import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { LanguageService } from '@igo2/core';

import { SharedDataService } from './../../services/shared-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isDisplayingMap: boolean;

  showSearchBar: boolean = false;
  searchBarTemplate: TemplateRef<any>;
  sidenavTemplate: TemplateRef<any>;

  isSidenavOpen: boolean = false;

  constructor(
    protected languageService: LanguageService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.sharedDataService.showSearchBar$.subscribe((value) => {
      this.showSearchBar = value;
    });

    this.sharedDataService.searchBarTemplate$.subscribe((template) => {
      this.searchBarTemplate = template;
    });

    this.sharedDataService.sidenavTemplate$.subscribe((template) => {
      this.sidenavTemplate = template;
    });
  }
}
