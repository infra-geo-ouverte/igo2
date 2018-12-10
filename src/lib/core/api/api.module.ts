import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api.interceptor';
import { provideApiService } from './api.providers';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    provideApiService(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class FadqLibApiModule {}
