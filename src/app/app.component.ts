import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LanguageService, ConfigService, AnalyticsService } from '@igo2/core';
import { AuthOptions } from '@igo2/auth';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authConfig: AuthOptions;
  private themeClass = 'blue-theme';

  constructor(
    protected languageService: LanguageService,
    private configService: ConfigService,
    private analyticsService: AnalyticsService,
    private renderer: Renderer2,
    private titleService: Title,
    private platform: Platform,
    private androidPermissions: AndroidPermissions
  ) {
    this.checkPermissions();

    this.authConfig = this.configService.getConfig('auth');

    const title = this.configService.getConfig('title');
    if (title) {
      this.titleService.setTitle(title);
    }

    const theme = this.configService.getConfig('theme') || this.themeClass;
    if (theme) {
      this.renderer.addClass(document.body, theme);
    }
  }

  checkPermissions() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          let locationPermissions = false;

          this.androidPermissions.checkPermission('android.permission.ACCESS_FINE_LOCATION').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.ACCESS_COARSE_LOCATION').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );
          this.androidPermissions.checkPermission('android.permission.ACCESS_BACKGROUND_LOCATION').then(
            result => (locationPermissions = result.hasPermission),
            err => (locationPermissions = false)
          );

          if(!locationPermissions) {
            this.androidPermissions.requestPermissions([
              'android.permission.ACCESS_COARSE_LOCATION',
              'android.permission.ACCESS_FINE_LOCATION' ,
              'android.permission.ACCESS_BACKGROUND_LOCATION']
              );
          }
        }
      }
    });
  }
}
