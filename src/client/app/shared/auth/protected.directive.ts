import {Directive, ElementRef} from "@angular/core";
import {AuthService} from "./index";

@Directive({
    selector: "[protected]"
})

export class ProtectedDirective {
    constructor(private authentication: AuthService, private el: ElementRef) {
        if (!authentication.isAuthenticated()) {
            el.nativeElement.parentNode.removeChild(el.nativeElement);
        }
    }
}
