import { Component, Input, Output, OnInit, EventEmitter, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'igo-geolocation',
  templateUrl: 'geolocation.component.html',
  styleUrls: ['geolocation.component.css']
})

export class GeolocationComponent {
  // TODO: afficher error à l'utilisateur si refus localisation
}
