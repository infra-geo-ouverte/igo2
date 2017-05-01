import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { SidenavComponent } from './sidenav';
import { PortalComponent } from './portal.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    PortalComponent
  ],
  declarations: [
    PortalComponent,
    SidenavComponent,
    ToastComponent
  ]
})
export class PortalModule {}
