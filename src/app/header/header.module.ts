import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
// import { DropdownModule } from 'ng2-bootstrap';
// import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule
    // SharedModule
    // DropdownModule.forRoot()
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})

export class HeaderModule { }
