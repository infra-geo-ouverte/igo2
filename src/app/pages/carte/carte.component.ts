import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb('/carte'); // pour le fil d'ariane
  }
}
