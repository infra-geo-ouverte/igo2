import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AutreOutilComponent } from './autreOutil.component';

@NgModule({
    imports: [SharedModule],
    declarations: [AutreOutilComponent],
    entryComponents: [AutreOutilComponent],
    exports: []
})

export class AutreOutilModule { }
