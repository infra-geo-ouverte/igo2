import { Component, OnInit }   from '@angular/core';
import { Validators, FormGroup, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute }      from '@angular/router';
import {AuthService} from "./auth.service";

@Component({
  selector: "m-auth",
  moduleId: module.id,
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.css"]
})

export class AuthComponent implements OnInit {
  private form: FormGroup;
  private error: string = "";
  private user: string = "";
  private loadingBool: boolean = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      username: ["", Validators.required],
      password: [""]
    });

    if (this.auth.decodeToken()) {
        this.user = this.auth.decodeToken().name;
    }
  }

  public ngOnInit() {
      this.analyzeRoute();
  }

  protected login(values: any) {
    this.loadingBool = true;
    this.auth.login(values.username, values.password)
      .subscribe(
        (token: string) => {
            let redirectUrl = this.auth.redirectUrl;
            if (!redirectUrl || redirectUrl === '/login') {
                this.router.navigateByUrl('/');
            } else {
              this.router.navigateByUrl(redirectUrl);
            }
        },
        (errors: any) => {
          this.loadingBool = false;
          let message = "";
          for (let err in errors) {
            if (!errors.hasOwnProperty(err)) { continue; }
            message += errors[err]['message'] + '\n';
          }
          this.error = message;
        }
      );
    return false;
  }

  protected logout() {
      this.auth.logout().subscribe(() => this.router.navigate(["/login"]));
  }

  private analyzeRoute() {
    let url: any = this.route.url;
    let isLogoutRoute: boolean = url['value'][0].path === 'logout';
    if (isLogoutRoute) {
      this.logout();
    }
  }
}
