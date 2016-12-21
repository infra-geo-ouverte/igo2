import { NgModule } from '@angular/core';
import { SharedModule }   from '../shared.module';
import { NavbarComponent } from './navbar.component';
// import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [SharedModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule { }
