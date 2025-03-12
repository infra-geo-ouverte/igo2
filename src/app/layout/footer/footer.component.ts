import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

import { LanguageService } from '@igo2/core';

import { SharedDataService } from './../../services/shared-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isDisplayingMap: boolean;

  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;

  showSearchBar: boolean = false;
  searchBarTemplate: TemplateRef<any>;
  sidenavTemplate: TemplateRef<any>;

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

    // Écoutez les événements pour ouvrir le panneau
    this.sharedDataService.sidenavResults$.subscribe((hasResults) => {
      if (hasResults && this.expansionPanel) {
        this.expansionPanel.open(); // Ouvrir le panneau
      }
    });
  }

  // eslint-disable-next-line max-len
  // se déclenchera lorsqu'on fermera  le mat-expansion-panel-sidenav pour propager l’événement indiquant que le mat-expansion-panel-sidenav est fermé
  onPanelClose() {
    setTimeout(() => {
      const portalComponent = document.querySelector('app-portal');
      if (portalComponent) {
        portalComponent.dispatchEvent(
          new CustomEvent('updateSidenav', { bubbles: true })
        );

        portalComponent.dispatchEvent(
          new CustomEvent('matPanelClose', { bubbles: true })
        );
      }
    }, 100);

    this.sharedDataService.setSidenavResults(false);
  }
}
