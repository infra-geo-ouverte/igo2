import { NgModule } from '@angular/core';

import {
  provideReseauTransportQuebecSearchSource,
  provideReseauTransportQuebecReverseSearchSource,
  provideDefaultReseauTransportQuebecSearchResultFormatter
} from './reseau-transport-quebec.providers';


@NgModule({
  providers: [
    provideReseauTransportQuebecSearchSource(),
    provideReseauTransportQuebecReverseSearchSource(),
    provideDefaultReseauTransportQuebecSearchResultFormatter()
  ]
})
export class AppReseauTransportQuebecModule {}
