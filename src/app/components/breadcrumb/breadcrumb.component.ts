import { Component, HostListener, OnInit } from '@angular/core';

import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: { label: string; url: string }[] = [];

  isMobile = false;
  displayedBreadcrumb: { label: string; url: string } | null = null;

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.items.subscribe((items) => {
      this.items = items;
      this.updateBreadcrumbDisplay();
    });
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768; // Détecte un écran mobile
    this.updateBreadcrumbDisplay();
  }

  updateBreadcrumbDisplay(): void {
    if (this.isMobile && this.items.length >= 2) {
      if (
        this.items.length >= 3 &&
        this.items[this.items.length - 2].label ===
          "Outil de repérage d'immeubles"
      ) {
        this.displayedBreadcrumb = this.items[this.items.length - 3];
      } else {
        this.displayedBreadcrumb = this.items[this.items.length - 2];
      }
    } else {
      this.displayedBreadcrumb = null; // Afficher normalement sur desktop
    }
  }
}
