import { NgModule } from '@angular/core';
import { SharedModule }   from '../shared.module';
import { HeaderComponent } from './header.component';
// import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [SharedModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})

export class HeaderModule { }
