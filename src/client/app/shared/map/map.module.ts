import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MapComponent } from './map.component';
import { MapService } from "./map.service";

@NgModule({
    imports: [SharedModule],
    declarations: [MapComponent],
    exports: [MapComponent],
    providers: [MapService]
})

export class MapModule { }
