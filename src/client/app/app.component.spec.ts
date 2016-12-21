import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from "./shared/shared.module";
import { MapModule } from "./shared/map/index";
import { ToolsModule } from "./shared/tools/index";

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule.withRoutes(config), SharedModule, MapModule, ToolsModule],
        declarations: [TestComponent, HeaderComponent,
          NavbarComponent, AppComponent,
          HomeComponent, AboutComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<igo-app></igo-app>'
})

class TestComponent {
}
